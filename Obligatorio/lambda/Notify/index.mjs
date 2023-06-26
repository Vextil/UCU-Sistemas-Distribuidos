import  { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const REGION = "us-east-2"; // Replace with your AWS Region, e.g. "us-east-1"
const snsClient = new SNSClient({ region: REGION });

export const handler = async (event) => {
    console.log("event", JSON.stringify(event));
    const topicArn = 'arn:aws:sns:us-east-2:756702772839:Leak'; // Replace with your actual topic ARN
    try {
        for (const record of event.Records) {
            const params = {
                Message: 'Se detectó una pérdida en el sensor ' + record.messageAttributes.SensorId.stringValue + " - Cantidad: " + record.messageAttributes.Amount.stringValue + " - Cantidad Máxima: " + record.messageAttributes.MaxAmount.stringValue + " - Fecha: " + record.messageAttributes.Time.stringValue, // Message content
                TopicArn: topicArn,
            };
            const command = new PublishCommand(params);
            await snsClient.send(command);
        }
        console.log('SNS message sent successfully.');
    } catch (error) {
        console.error('Failed to send SNS message:', error);
    }
};
