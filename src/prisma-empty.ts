import { PrismaClient } from "../prisma/empty";

export async function handler() {
  const client = new PrismaClient();
  console.log(await client.cool.findMany());
  console.log("ok");
}
