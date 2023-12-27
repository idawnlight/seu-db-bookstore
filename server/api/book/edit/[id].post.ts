import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    const body = await readBody(event)
    const newBook = body.book;

    try {
        const book = await prisma.book.update({
            where: {
                id: parseInt(id)
            },
            data: newBook
        })
        return {
            status: 200,
            data: book
        }
    } catch (error) {
        return {
            status: 500,
            body: {
                error: error
            }
        }
    }
})