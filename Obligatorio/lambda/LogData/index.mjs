import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const sqsClient = new SQSClient({ region: "us-east-2" });
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  let body = JSON.parse(event.body);
  let sensorId = event.requestContext.authorizer.principalId;
  
  let leaking = body.amount < body.maxAmount;

  try {
    const command = new PutCommand({
      TableName: "SensorData",
      Item: {
        "sensorId": sensorId,
        "time": body.time,
        "amount": body.amount,
        "maxAmount": body.maxAmount
      },
    });
    const dynamoData = await docClient.send(command);

    // Update lastUpdated in Sensor table
    const updateCommand = new UpdateCommand({
      TableName: "Sensors",
      Key: { "id": sensorId },
      UpdateExpression: "set lastUpdated = :u, #st = :s",
      ExpressionAttributeValues: {
        ":u": new Date().toISOString(),
        ":s": leaking ? 'leaking' : 'ok'
      },
      ExpressionAttributeNames: {
        "#st": "status"
      }
    });
    await docClient.send(updateCommand);

    if (leaking) {
      const params = {
        MessageAttributes: {
          SensorId: {
            DataType: "String",
            StringValue: sensorId
          },
          Time: {
            DataType: "String",
            StringValue: body.time
          },
          Amount: {
            DataType: "Number",
            StringValue: body.amount.toString()
          },
          MaxAmount: {
            DataType: "Number",
            StringValue: body.maxAmount.toString()
          }
        },
        MessageBody: "Leak detected",
        QueueUrl: "https://sqs.us-east-2.amazonaws.com/756702772839/Leak.fifo",
        MessageGroupId: "Sensor",
        MessageDeduplicationId: sensorId
      };
      const data = await sqsClient.send(new SendMessageCommand(params));
      if (data) {
        console.log("Success, message sent. MessageID:", data.MessageId);
        const bodyMessage = 'Message sent to SQS - MessageId: ' + data.MessageId + " " + dynamoData;
        return {
          statusCode: 200,
          body: JSON.stringify({ message: bodyMessage }),
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        };

      } else {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error sending to SQS!' }),
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        };
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "No leak detected." }),
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    };
  }
  catch (err) {
    console.log("Error", err);
  }

};
