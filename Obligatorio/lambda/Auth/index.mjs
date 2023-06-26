import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
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

export const handler = async (event) => {
    const token = event.authorizationToken.replace('Bearer ', '');
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw Error('Unauthorized');
    }

    const { permissions, username, sensor } = decodedToken;

    const pathEnd = event.methodArn.split('/').pop();
    if (pathEnd && !permissions.includes(pathEnd)) {
        throw Error('Unauthorized');
    }

    return generatePolicy(username || sensor, 'Allow', event.methodArn);
};

function generatePolicy(principalId, effect, resource) {
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}
