import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("user")) {
        return {
            status: 401,
            error: "Unauthorized",
        };
    }

    const req = await readBody(event)
    if (!req.bookId || !req.comment) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    try {
        const newComment = await prisma.comment.create({
            data: {
                bookId: req.bookId,
                userId: event.context.auth.user.id,
                content: req.comment
            }
        })
        return {
            status: 200,
            data: newComment
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