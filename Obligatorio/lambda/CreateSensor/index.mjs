import { DynamoDB, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const REGION = "us-east-2";
const secret_name = "JWT_KEY";

const client = new SecretsManagerClient({
  region: REGION,
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT",
    })
  );
} catch (error) {
  throw error;
}

const JWT_SECRET = response.SecretString;
const TableName = "Sensors";

const dbclient = new DynamoDB({ region: REGION });

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { name } = body;

  const Item = {
      name: { S: name },
      id: { S: crypto.randomUUID() },
      lastUpdated: { S: "" }
  };

  const putParams = {
      TableName,
      Item,
  };

  try {
    const data = await dbclient.send(new PutItemCommand(putParams));
    console.log("Success", data);
    const permissions = ["LogData"];
    const token = jwt.sign({ sensor: Item.id.S, name: Item.name.S, permissions }, JWT_SECRET, {
      expiresIn: '30y'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', id: Item.id.S, name: Item.name.S, token }),
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
