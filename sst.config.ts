import type { SSTConfig } from "sst"
import { MyStack } from "./stacks/MyStack"

export default {
  config(input) {
    return {
      name: "prisma-client-repro",
      region: "us-east-1",
      main: "stacks/index.ts"
    }
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "nodejs18.x",
      architecture: "arm_64",
    })

    app
      .stack(Api)
  },
} satisfies SSTConfig