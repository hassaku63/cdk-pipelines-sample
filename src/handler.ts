import { Handler } from "aws-cdk-lib/aws-lambda"
import { Context } from 'aws-lambda';

export const handler: Handler = async (event: unknown, context: Context) => {
  console.log("event: ", event)
  console.log("context: ", context)
  return {
    message: "hello world",
  }
}