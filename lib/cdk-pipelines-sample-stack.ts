import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from "aws-cdk-lib/pipelines";
import { MyStage } from "./application";


export interface StackConfigProps {
  githubRepo: string;
  githubRepoOwner: string;
  codestarConnectionArn: string;
}

type CdkPipelinesSampleStackProps =  StackConfigProps & cdk.StackProps;

export class CdkPipelinesSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CdkPipelinesSampleStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const pipeline = new pipelines.CodePipeline(this, "pipeline", {
      pipelineName: "cdkCICDPipeline",
      synth: new pipelines.CodeBuildStep("Synth", {
        projectName: "cdkPipelineBuild",
        input: pipelines.CodePipelineSource.connection(
          `${props.githubRepoOwner}/${props.githubRepo}`,
          "main",
          {
            connectionArn: props.codestarConnectionArn,
            triggerOnPush: false,
          }
        ),
        // Install dependencies, build and run cdk synth
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
      dockerEnabledForSynth: true,
      selfMutation: false,
    });

    const development = new MyStage(this, "Dev", {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
      }
    });
    pipeline.addStage(development);
  }
}
