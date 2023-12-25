import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("admin")) {
        return {
            status: 401,
            error: "Unauthorized",
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