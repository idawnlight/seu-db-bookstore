import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("user")) {
        return {
            status: 401,
            error: "Unauthorized",
        };
    }

    const req = await readBody(event)
    if ('bookId' in req === false || 'quantity' in req === false) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    const userId = event.context.auth.user.id;

    try {
        const cart = await prisma.cart.findFirstOrThrow({
            where: {
                userId,
                bookId: req.bookId
            }
        })

        if (req.quantity <= 0) {
            const deletedCart = await prisma.cart.delete({
                where: {
                    id: cart.id
                }
            })
            return {
                status: 200,
                data: {
                    message: "Book removed from cart."
                }
            }
        }

        const updatedCart = await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                quantity: req.quantity
            }
        })
    } catch (error) {
        const newCart = await prisma.cart.create({
            data: {
                userId,
                bookId: req.bookId,
                quantity: req.quantity
            }
        })
    }

    return {
        status: 200,
        data: {
            message: "Book quantity updated."
        }
    }
});