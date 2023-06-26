import { DynamoDB, GetItemCommand } from "@aws-sdk/client-dynamodb";
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
const TableName = "Users";

const dbclient = new DynamoDB({ region: REGION });

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { username, password } = body;

  const getParams = {
    TableName,
    Key: {
      "username": { S: username }
    }
  };

  try {
    const { Item } = await dbclient.send(new GetItemCommand(getParams));
    if (!Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ status: 'error', message: 'User not found' }),
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
        };
    }

    const storedPasswordHash = Item.password.S;

    // Hash the provided password
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    if (hashedPassword !== storedPasswordHash) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          status: 'error', message: 'Invalid password'
        }),
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      };
    }

    const permissions = ["CreateUser", "GetUsers", "GetData", "CreateSensor", "GetSensors", "DeleteSensor"];
    const token = jwt.sign({ username, permissions }, JWT_SECRET, {
      expiresIn: '7d'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', token, username }),
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
