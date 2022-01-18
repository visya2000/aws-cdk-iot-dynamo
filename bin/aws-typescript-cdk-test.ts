#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaNodeCdkStack } from '../lib/aws-typescript-cdk-test-stack';

export const tableName = 'iot-core-table-cdk-test';
export const bucketName = 'iot-core-dev-serverlessdeploymentbucket-1h4noz0gph3yw';

const app = new cdk.App();
new LambdaNodeCdkStack(app, 'LambdaNodeCdkStack', {
  env: {
    account: '778215858548',
    region: 'eu-central-1',
  },
});