'use server';

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const newrelic = require("newrelic");

const TABLE_NAME = "codezorp-dev";

export type ReviewResult = {
  category: string
  severity: string
  file: string
  line_number: number
  problem: string
  suggestion: string
  clarifying_question: string
}

const ddbClient = new DynamoDBClient({
   region: "us-east-1",
   credentials: {
     accessKeyId: process.env.CZ_AWS_ACCESS_KEY_ID as string,
     secretAccessKey: process.env.CZ_AWS_SECRET_ACCESS_KEY as string,
   },
 });

 export const createGitHubInstallation = async (repo: string, installationId: string) => {
   const now = new Date().toUTCString();
   const pk = `intg-gh-${repo}-${installationId}`;
   const command = new PutCommand({
       TableName: TABLE_NAME,
       Item: {
          pk: pk,
          sk: "integration",
          type: "github",
          installationId: installationId,
          createdAt: now,
          updateAt: now
       },
      //  ReturnValues: 'ALL_OLD',
    })
    await ddbClient.send(command);
    return pk;
}

export async function checkResultsInDb(messageId: string, integrationId: string) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: {
       pk: `msg-${messageId}`,
       sk: integrationId,
    }
  })
  const response = await ddbClient.send(command);
  if (response.Item) {
    // console.log("AAA",response.Item)
    return JSON.parse(response.Item.response).map((item: { issue: ReviewResult; }) => item.issue as ReviewResult);
  } else {
    return null;
  }
}

export async function checkCachedResults(integrationId: string, prUniqueId: string) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: {
       pk: integrationId,
       sk: `review-${prUniqueId}`,
    }
  })
  const response = await ddbClient.send(command);
  if (response.Item) {
    const parsed = JSON.parse(response.Item.response);
    // console.log("AAA",response.Item)
    return parsed.map((item: { issue: ReviewResult; }) => item.issue as ReviewResult);
  } else {
    return null;
  }
}

export const saveFeedback = async (integrationId: string, uniqueId: string, feedback: string) => {
  newrelic.recordCustomEvent('Feedback', {
    feedback, integrationId, uniqueId
  });
  // const now = new Date().toUTCString();
  // const command = new PutCommand({
  //     TableName: TABLE_NAME,
  //     Item: {
  //        pk: integrationId,
  //        sk: `feedback-${uniqueId}`,
  //        feedback: feedback,
  //        createdAt: now,
  //     },
  //    //  ReturnValues: 'ALL_OLD',
  //  })
  //  await ddbClient.send(command);
}