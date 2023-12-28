import { createToken } from "~/server/helpers/jwt";
import prisma from "~/server/helpers/prisma";
import * as argon2 from "argon2";

export default defineEventHandler(async (event) => {
    const newUser = await readBody(event)
    console.log(newUser)

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    username: newUser.username,
                },
                {
                    email: newUser.email,
                },
            ],
        },
    });

    if (user) {
        return {
            status: 401,
            error: "User already exists",
        };
    }

    newUser.password = await argon2.hash(newUser.password);

    try {
        const user = await prisma.user.create({
            data: newUser,
        });
        const token = createToken({ userId: user.id });
        setCookie(event, "token", token, {
            httpOnly: true,
        });

        return {
            status: 200,
            data: {
                userId: user.id,
            },
        }
    } catch (e) {
        console.log(e)
        return {
            status: 500,
            error: "Internal server error",
        };
    }
});