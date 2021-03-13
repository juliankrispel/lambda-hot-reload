import { S3, Lambda } from 'aws-sdk'
import { promises } from 'fs'
import { join } from 'path'
import downloadFromS3 from './lib/downloadFromS3'
import updateLambdas from './lib/updateLambdas'

const { readdir, readFile } = promises

const lambda = new Lambda()
const s3 = new S3()

// lambda.updateFunctionCode()
// 1. Download to /tmp/src
// 2. Compile to /tmp/dist
// 3. Upload dist to s3
// 4. Update lambda function
let bootstrapped = false
const Bucket = process.env.bucket_name as string

export async function handler() {
  //const files = await readdir('/tmp/src')
  await updateLambdas()

//  s3.listObjectsV2({
//    Bucket,
//    Prefix: 'dist'
//  })
//
//  await Promise.all(files.map(async (file) => {
//    const content = await readFile(join('/tmp/src', file))
//    s3.putObject()
//
//    // await lambda.updateFunctionCode({
//    //   FunctionName: 'some',
//    //   ZipFile
//    // }).promise()
//  }))
}

exports.handler = handler
