import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import crypto from "crypto";

const dbclient = new DynamoDBClient({ region: "us-east-2" });

export const handler = async (event) => {
    const body = JSON.parse(event.body);
    const { username, email, password } = body;

    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    const userItem = {
        username: { S: username },
        email: { S: email },
        password: { S: hashedPassword },
    };

    const putParams = {
        TableName: "Users",
        Item: userItem,
    };

    try {
        const data = await dbclient.send(new PutItemCommand(putParams));
        console.log("Success", data);
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'success' }),
            headers: { 
              'Content-Type': 'application/json',
            },
        };
    } catch (err) {
        console.error("Error", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'error', error: err }),
            headers: { 
              'Content-Type': 'application/json',
            },
        };
    }
};
