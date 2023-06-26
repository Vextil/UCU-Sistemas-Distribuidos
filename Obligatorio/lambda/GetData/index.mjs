import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({ region: 'us-east-2' });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async(event) => {
    
    if (!event.queryStringParameters || !event.queryStringParameters.sensorId) {
        const response = {
            statusCode: 400,
            body: JSON.stringify('sensorId is required'),
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
        };
        return response;
    }
    
    const pageSize = event.queryStringParameters.pageSize ? parseInt(event.queryStringParameters.pageSize) : 100000;
    const sensorId = event.queryStringParameters.sensorId;

    let params = {
        TableName: 'SensorData',
        KeyConditionExpression: 'sensorId = :sensorId',
        ExpressionAttributeValues: {
            ':sensorId': sensorId
        },
        Limit: pageSize,
    };

    try {
        const command = new QueryCommand(params);
        const data = await ddbDocClient.send(command);
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                count: data.Count,
                items: data.Items.reverse()
            }),
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
        };
        return response;
    } catch (error) {
        console.error(error);
        const response = {
            statusCode: 500,
            body: JSON.stringify('Error fetching data from DynamoDB'),
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
        };
        return response;
    }
};
