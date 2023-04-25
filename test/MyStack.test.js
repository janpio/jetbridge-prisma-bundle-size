import { expect, haveResource } from "aws-cdk-lib/assertions";
import * as sst from "sst/constructs";
import MyStack from "../stacks/MyStack";

test("Test Stack", () => {
  const app = new sst.App();
  // WHEN
  const stack = new MyStack(app, "test-stack");
  // THEN
  expect(stack).to(haveResource("AWS::Lambda::Function"));
});
