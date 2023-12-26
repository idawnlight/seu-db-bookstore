import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    const comments = await prisma.comment.findMany({
        where: {
            bookId: parseInt(id)
        },
        include: {
            user: true
        }
    })

    return {
        status: 200,
        data: comments
    }
})