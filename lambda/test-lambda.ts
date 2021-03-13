import { ProcessCredentials, S3 } from 'aws-sdk'
const s3 = new S3()

module.exports = async function () {
  console.log(s3)
  return { ok: true }
}