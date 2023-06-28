import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class MyAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const f = new NodejsFunction(this, "nodejsFunction", {
      entry: "src/handler.ts",
      runtime: Runtime.NODEJS_18_X,
    });

    new cdk.CfnOutput(this, "nodejsFunctionArn", {
      value: f.functionArn,
    });

    new sqs.Queue(this, "queue");
  }
}

export class MyStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new MyAppStack(this, "MyAppStack");
  }
}