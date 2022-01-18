import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import { DynamoEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { aws_iotevents } from 'aws-cdk-lib';

export class LambdaNodeCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Table', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'ID', type: dynamodb.AttributeType.STRING },
      stream: dynamodb.StreamViewType.OLD_IMAGE,
      tableName: 'iot-core-table-cdk-test',
      timeToLiveAttribute: 'expire_at'
    });

    const sub = new lambda.Function(this, 'sub', {
      code: lambda.Code.fromAsset('./src/lambda'),
      functionName: "sub",
      handler: 'sub.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });

    const pub = new lambda.Function(this, 'pub', {
      code: lambda.Code.fromAsset('./src/lambda'),
      functionName: "pub",
      handler: 'pub.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(60),
    });

    const streamHandler = new lambda.Function(this, 'streamHandler', {
      code: lambda.Code.fromAsset('./src/lambda'),
      functionName: "streamHandler",
      handler: 'streamHandler.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });

    streamHandler.addEventSource(new DynamoEventSource(table, {
      startingPosition: lambda.StartingPosition.LATEST
    }));
  }
}