import * as sst from "@serverless-stack/resources";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Tracing } from "aws-cdk-lib/aws-lambda";
import { Construct } from "aws-cdk-lib";
import { StackProps } from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /no-prisma": "src/lambda.handler",
        "GET /prisma": {
          function: {
            tracing: Tracing.ACTIVE,
            handler: "src/prisma.handler",
            environment: {
              // ...layer.environment,
              DATABASE_URL: "postgresql://coral_combined_mariel:utYDPjGQS7@db-provision-postgres23452b4.c8yxynpcltwd.us-east-1.rds.amazonaws.com:5432/ivory_narwhal",
              DEBUG: "*",
            },
            bundle: {
              commandHooks: {
                beforeInstall: () => [],
                beforeBundling: () => [],
                afterBundling: (inputDir, outputDir) =>
                {
                  return [
                    `ls ${inputDir}`,
                    `cp "${inputDir}/prisma/schema.prisma" "${outputDir}/src"`,
                    `cp "${inputDir}/node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node" "${outputDir}/src"`,
                  ];
                },
              },
            },
          },
        },
        "GET /prisma-empty": {
          function: {
            tracing: Tracing.ACTIVE,
            handler: "src/prisma-empty.handler",
            environment: {
              // ...layer.environment,
              DATABASE_URL: "postgresql://coral_combined_mariel:utYDPjGQS7@db-provision-postgres23452b4.c8yxynpcltwd.us-east-1.rds.amazonaws.com:5432/ivory_narwhal",
              DEBUG: "*",
            },
            bundle: {
              commandHooks: {
                beforeInstall: () => [],
                beforeBundling: () => [],
                afterBundling: (inputDir, outputDir) =>
                {
                  return [
                    `ls ${inputDir}`,
                    `cp "${inputDir}/prisma/empty/schema.prisma" "${outputDir}/src"`,
                    `cp "${inputDir}/prisma/empty/libquery_engine-rhel-openssl-1.0.x.so.node" "${outputDir}/src"`,
                  ];
                },
              },
            },
          },
        },
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });

    // const layer = new PrismaLayer(this, "layer", {})

    // new NodejsFunction(this, "nodb", {
    //   tracing: Tracing.ACTIVE,
    //   entry: __dirname + "/../../src/index.empty.ts",
    // });
  }
}
