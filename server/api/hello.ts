import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    const users = await prisma.user.findMany();

    return {
        body: {
            users,
        },
    };
});
