import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3'
import { Function, Runtime, AssetCode } from '@aws-cdk/aws-lambda'
import {
  Role,
  ServicePrincipal,
  PolicyDocument,
  Effect,
  PolicyStatement,
} from '@aws-cdk/aws-iam'
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment'

export class UpdateLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'src-test-project')

    const policy = new PolicyDocument({
      statements: [new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:*', 'lambda:*'],
        resources: ['arn:aws:s3:::*', 'arn:aws:lambda:::*'],
      })]
    })

    const lambdaRole = new Role(this, 'lambda-compiler-role', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      inlinePolicies: {
        'allow-s3': policy
      }
    })

    new BucketDeployment(this, 'DeployTestProject', {
      sources: [Source.asset('./test-project')],
      destinationBucket: bucket,
      
    });

    const code = new AssetCode('dist')

    new Function(this, 'compile-and-update-lambdas', {
      runtime: Runtime.NODEJS_12_X,
      code,
      handler: 'updater-lambda.handler',
      role: lambdaRole,
      reservedConcurrentExecutions: 1,
      environment: {
        bucket_name: bucket.bucketName
      }
    })

    // The code that defines your stack goes here
  }
}
