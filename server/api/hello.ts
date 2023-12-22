import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany();

  return {
    body: {
      users,
    },
  };
});
