import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth || event.context.auth.user.id != 1) {
        return {
            status: 401,
            body: {
                error: "Unauthorized",
            },
        };
    }

    const body = await readBody(event)
    const book = body.book;

    try {
        const newBook = await prisma.book.create({
            data: book
        })
        return {
            status: 200,
            data: newBook
        }
    } catch (error) {
        return {
            status: 500,
            body: {
                error: error
            }
        }
    }
});