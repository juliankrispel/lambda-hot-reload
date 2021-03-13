import { Lambda } from 'aws-sdk'

const lambda = new Lambda()

const Bucket = process.env.bucket_name as string

export default async function() {
  await lambda.updateFunctionCode({
    FunctionName: 'hello-world',
    S3Bucket: Bucket,
    S3Key: 'hello-world.zip'
  }).promise()
}