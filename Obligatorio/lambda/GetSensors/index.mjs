import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({ region: 'us-east-2' });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async(event) => {

    let params = {
        TableName: 'Sensors',
    };

    try {
        const command = new ScanCommand(params);
        const data = await ddbDocClient.send(command);
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                count: data.Count,
                items: data.Items
            }),
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:5173'
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
              'Access-Control-Allow-Origin': 'http://localhost:5173'
            },
        };
        return response;
    }
};
