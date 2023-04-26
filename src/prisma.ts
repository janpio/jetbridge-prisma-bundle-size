import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handler() {
  await prisma.$connect()
  console.log(await prisma.cool.findMany());
  console.log("ok");
}
