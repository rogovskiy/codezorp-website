"use server"

import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

const QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/219380407253/codezorp-review-queue"

const sqsClient = new SQSClient({
   region: "us-east-1",
   credentials: {
     accessKeyId: process.env.CZ_AWS_ACCESS_KEY_ID as string,
     secretAccessKey: process.env.CZ_AWS_SECRET_ACCESS_KEY as string,
   },
 });

 export async function requestCodeReview(integrationId: string, pr: string, uniqueId: string) {
    const response = await sqsClient.send(new SendMessageCommand({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify({
            integrationId, pr, uniqueId
        })
    }));
    return response.MessageId;
 }

