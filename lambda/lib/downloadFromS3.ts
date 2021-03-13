import { S3, Lambda } from 'aws-sdk'
import { promises, existsSync } from 'fs'
import { join, dirname, basename } from 'path'

const { writeFile, mkdir } = promises

const lambda = new Lambda()
const s3 = new S3()

export default async function() {
  const Bucket = process.env.bucket_name as string
  const { Contents } = await s3.listObjectsV2({
    Bucket
  }).promise()

  if (Contents) {
    await Promise.all(Contents.map(async ({ Key }) => {
      // object.Key
      // console.log(object)
      if (Key != null) {
        const resp = await s3.getObject({
          Bucket,
          Key
        }).promise()
        const path = join('/tmp/src', Key)
        const pathDir = dirname(path)
        const dirExists = existsSync(path)

        if (!dirExists) {
          await mkdir(pathDir, { recursive: true })
        }

        return writeFile(path, resp.Body)
      }
      return Promise.resolve()
    }))
  }
}