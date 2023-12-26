import prisma from "~/server/helpers/prisma";
import * as argon2 from "argon2";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("user")) {
        return {
            status: 401,
            error: "Unauthorized",
        };
    }

    const req = await readBody(event)
    if (!req.oldPassword || !req.newPassword) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: event.context.auth.user.id
            }
        })

        const passwordMatch = await argon2.verify(user.password, req.oldPassword);
        if (!passwordMatch) {
            return {
                status: 401,
                error: "Old password is incorrect",
            };
        }

        const newPassword = await argon2.hash(req.newPassword)
        await prisma.user.update({
            where: {
                id: event.context.auth.user.id
            },
            data: {
                password: newPassword
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