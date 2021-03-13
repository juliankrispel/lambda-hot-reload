#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { UpdateLambdaStack } from '../lib/update-lambda-stack';

const app = new cdk.App();
new UpdateLambdaStack(app, 'UpdateLambdaStack');
