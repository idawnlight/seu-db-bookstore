import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("user")) {
        return {
            status: 401,
            error: "Unauthorized",
        };
    }

    const req = await readBody(event)
    if (!req.bookId) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    const quantity = req.quantity || 1;
    const userId = event.context.auth.user.id;

    try {
        const cart = await prisma.cart.findFirstOrThrow({
            where: {
                userId,
                bookId: req.bookId
            }
        })

        const updatedCart = await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                quantity: cart.quantity + quantity
            }
        })
    } catch (error) {
        const newCart = await prisma.cart.create({
            data: {
                userId,
                bookId: req.bookId,
                quantity
            }
        })
    }

    return {
        status: 200,
        data: {
            message: "Book added to cart."
        }
    }
});