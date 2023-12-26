import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    const book = await prisma.book.findFirst({
        where: {
            id: parseInt(id)
        }
    })

    if (!book) {
        return {
            status: 404,
            error: "Book not found",
        };
    }

    return {
        status: 200,
        data: book
    }
})