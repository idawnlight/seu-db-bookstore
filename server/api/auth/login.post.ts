import { createToken } from "~/server/helpers/jwt";
import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, password } = body;
    console.log(body)

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    username,
                },
                {
                    email: username,
                },
            ],
        },
    });

    // console.log(user);

    if (!user) {
        return {
            status: 401,
            body: {
                error: "User not found",
            },
        };
    }

    if (!password) {
        return {
            status: 401,
            body: {
                error: "Password is incorrect",
            },
        };
    }

    const token = createToken({ userId: user.id });
    setCookie(event, "token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return {
        data: {
            userId: user.id,
        },
    }
});