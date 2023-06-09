/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html.

Purpose:
s3Client.js is a helper function that creates an Amazon Simple Service Solution (S3) client.

Inputs (replace in code):
- REGION

*/
// snippet-start:[GettingStarted.JavaScript.createclientv3]
import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = process.env.NEXT_PUBLIC_BUCKET_REGION; //e.g. "eu-north-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  },
});

export { s3Client };
// snippet-end:[GettingStarted.JavaScript.createclientv3]
