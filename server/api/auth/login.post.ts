import { createToken } from "~/server/helpers/jwt";
import prisma from "~/server/helpers/prisma";
import * as argon2 from "argon2";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, password } = body;

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

    if (!user) {
        return {
            status: 401,
            error: "User not found",
        };
    }

    const passwordMatch = await argon2.verify(user.password, password);
    if (!password || !passwordMatch) {
        return {
            status: 401,
            error: "Password is incorrect",
        };
    }

    const token = createToken({ userId: user.id });
    setCookie(event, "token", token, {
        httpOnly: true,
        sameSite: "none",
    });
    return {
        status: 200,
        data: {
            userId: user.id,
        },
    }
});