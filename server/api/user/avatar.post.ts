import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("user")) {
        return {
            status: 401,
            error: "Unauthorized",
        };
    }

    const req = await readBody(event)
    if (!req.avatar) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: event.context.auth.user.id
            },
            data: {
                avatar: req.avatar
            }
        })
    
        return {
            status: 200
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error",
        };
    }
});