/** *****************************************************
 * aws_api
 *
 * Shared AWS SDK functions for interacting with
 * AWS services
 *
 ****************************************************** */



//-------------------------------------------------------
// Dependencies
//-------------------------------------------------------
const aws = require("aws-sdk");
const s3 = new aws.S3({ apiVersion: "2006-03-01" });
const sqs = new aws.SQS({ apiVersion: "2012-11-05" });

/**
 * GET object from s3 bucket
 *
 * @param {String} bucket - Name of the s3 bucket
 * @param {String} key    - Key of object to GET
 *
 * @return {Promise}      - Body of object in s3
 *
 */
const getS3Object = (bucket, key) =>
  s3
    .getObject({
      Bucket: bucket,
      Key: key
    })
    .promise();

/**
 * DELETE object from s3 bucket
 *
 * @param {String} bucket - Name of the s3 bucket
 * @param {String} key    - Key of object to GET
 *
 * @return {Promise}      - TODO - figure out what this does
 *
 */
const deleteS3Object = (bucket, key) =>
  s3
    .deleteObject({
      Bucket: bucket,
      Key: key
    })
    .promise();

/**
 * PUT object in s3 bucket
 *
 * @param {String} body   - Binary string of S3 object to PUT
 * @param {String} bucket - Name of the s3 bucket
 * @param {String} key    - Key of object to PUT
 *
 * @return {Promise}      - ETag - hash of content changes to the object
 *
 */
const putS3Object = (body, bucket, key) =>
  s3
    .putObject({
      Body: body,
      Bucket: bucket,
      Key: key
    })
    .promise();

/**
 * Get parameters from AWS parameter store
 *
 * @param {Array} keys - Array of keys to fetch from Paramater store
 *
 * @return {Promise}   - Values for requested keys in Paramater store as object
 *
 */
const getParams = async keys => {
  const ssm = new aws.SSM();
  const result = await ssm
    .getParameters({
      Names: keys,
      WithDecryption: true
    })
    .promise();
  const parameters = result.Parameters;
  const params = {};
  for (let i = 0; i < keys.length; i++) {
    params[keys[i]] = parameters.find(p => p.Name === keys[i]).Value;
  }
  return params;
};

/**
 * Send batch of SQS messages
 *
 * @param {Array} entries   - Array of singular batch items as strings
 * @param {String} queueURL - URL of SQS queue
 *
 * @return {Promise}        - Response from SQS
 *
 */
const sendSQSMessages = (entries, queueURL) =>
  sqs
    .sendMessageBatch({
      Entries: entries,
      QueueUrl: queueURL
    })
    .promise();

module.exports = {
  getS3Object,
  deleteS3Object,
  putS3Object,
  getParams,
  sendSQSMessages
};
