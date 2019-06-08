/*
import { VPCStack } from '../../../../CF/my-aws-cdk/moduler/VpcStack';
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
* */

// Load the SDK and UUID
const AWS = require("aws-sdk");
const uuid = require("node-uuid");

const credentials = new AWS.SharedIniFileCredentials({
  //   profile: 'live2vod',
  //   profile: "dnops_sandbox",
});
AWS.config.credentials = credentials;
AWS.config.update({ region: "ap-southeast-2" });

// Create an S3 client
const s3 = new AWS.S3();

// Create a bucket and upload something into it
const bucketName = `node-sdk-sample-${uuid.v4()}`;
const keyName = "hello_world.txt";

// s3.createBucket({Bucket: bucketName}, function() {
//   var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//   s3.putObject(params, function(err, data) {
//     if (err)
//       console.log(err)
//     else
//       console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//   });
// });

const params = {};
s3.listBuckets(params, (err, data) => {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
  /*
  data = {
   Buckets: [
      {
     CreationDate: <Date Representation>,
     Name: "examplebucket"
    },
      {
     CreationDate: <Date Representation>,
     Name: "examplebucket2"
    },
      {
     CreationDate: <Date Representation>,
     Name: "examplebucket3"
    }
   ],
   Owner: {
    DisplayName: "own-display-name",
    ID: "examplee7a2f25102679df27bb0ae12b3f85be6f290b936c4393484be31"
   }
  }
  */
});

const channels = {};

const inputs = {};

const medialive = new AWS.MediaLive();

// medialive.listChannels(channels, function (err, data) {
//   if (err) console.log(err, err.stack)
//   else console.log(data)
// })

const input = {
  Destinations: [
    {
      StreamName: "api-stream-test-dest",
    }
    /* more items */
  ],
  Name: "api-stream-test-org",
  // RequestId: 'STRING_VALUE',
  // RoleArn: 'STRING_VALUE',
  Type: "RTP_PUSH",
  Vpc: {
    SubnetIds: [
      /* required */
      "subnet-02f5985b",
      "subnet-3e4b6748",
      /* more items */
    ],
    SecurityGroupIds: [
      "sg-cf0402a8"
      /* more items */
    ],
  },
};

// medialive.createInput(input, function (err,data) {
//   if (err) console.log(err)
//   else console.log(data)
// })

// medialive.createChannel(params, function(err,data){
//   if (err) console.log(err)
//   else console.log(data)
// })

medialive.listInputs(inputs, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});

// console.log("Credentials picked are: AWS_ACCESS_KEY_ID", AWS.config.credentials.AWS_ACCESS_KEY_ID, "AWS_SECRET_ACCESS_KEY", AWS.config.credentials.AWS_SECRET_ACCESS_KEY)

// console.log("credentials", credentials)
// console.log('AWS.config.credentials', AWS.config.credentials)
