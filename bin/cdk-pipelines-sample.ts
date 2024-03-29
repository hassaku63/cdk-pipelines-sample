#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkPipelinesSampleStack, StackConfigProps } from '../lib/cdk-pipelines-sample-stack';
import { DEFAULT_ACCOUNT_ENV } from 'aws-cdk-lib/cx-api';

const config: StackConfigProps = {
  githubRepoOwner: process.env.GITHUB_REPO_OWNER || '',
  githubRepo: process.env.GITHUB_REPO_NAME || '',
  codestarConnectionArn: process.env.CODESTAR_CONNECTION_ARN || '',
}
// if (config.githubRepoOwner === '') {
//   throw new Error('GITHUB_REPO_OWNER is not set');
// }
// if (config.githubRepo === '') {
//   throw new Error('GITHUB_REPO_NAME is not set');
// }
// if (config.codestarConnectionArn === '') {
//   throw new Error('CODESTAR_CONNECTION_ARN is not set');
// }

const app = new cdk.App();
new CdkPipelinesSampleStack(app, 'CdkPipelinesSampleStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  ...config,
});