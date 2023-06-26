import { DynamoDBClient, DeleteItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

const REGION = "us-east-2";
const dbclient = new DynamoDBClient({ region: REGION });

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { sensorId } = body;

  try {
    // Delete sensor from "Sensors" table
    await dbclient.send(new DeleteItemCommand({
      TableName: 'Sensors',
      Key: { 'id': { S: sensorId } }
    }));

    // Delete all "SensorData" for sensorId
    const sensorDataItems = await dbclient.send(new QueryCommand({
      TableName: 'SensorData',
      KeyConditionExpression: 'sensorId = :sensorId',
      ExpressionAttributeValues: {
        ':sensorId': { S: sensorId }
      }
    }));
    for (let item of sensorDataItems.Items) {
      await dbclient.send(new DeleteItemCommand({
        TableName: 'SensorData',
        Key: { 'sensorId': { S: sensorId }, 'time': item.time }
      }));
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'deleted' }),
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    };
  } catch (err) {
    console.error("Error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', error: err }),
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    };
  };
}
