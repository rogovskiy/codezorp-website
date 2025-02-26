'use server';

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "codezorp-dev";

const ddbClient = new DynamoDBClient({
   region: "us-east-1",
   credentials: {
     accessKeyId: process.env.CZ_AWS_ACCESS_KEY_ID as string,
     secretAccessKey: process.env.CZ_AWS_SECRET_ACCESS_KEY as string,
   },
 });

export const createIntegration = async (integration: string) => {
    const command = new PutCommand({
       TableName: TABLE_NAME,
       Item: {
          pk: `intg-${integration}`,
          sk: `test`,
          books: {} // no books for new user, an empty object
       },
       // ReturnValues: 'ALL_OLD',
    })
    const response = await ddbClient.send(command);
    console.log(response);
    return response
}