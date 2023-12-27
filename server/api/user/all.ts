import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("admin")) {
        return {
            status: 401,
            message: "Unauthorized",
        }
    }

    const users = await prisma.user.findMany();

    return {
        status: 200,
        data: users
    }
});