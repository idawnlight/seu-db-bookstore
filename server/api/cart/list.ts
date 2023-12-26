import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("user")) {
        return {
            status: 401,
            data: {
                message: "You must be logged in to view your cart."
            }
        }
    }

    const userId = event.context.auth.user.id;
    const carts = await prisma.cart.findMany({
        where: {
            userId
        },
        include: {
            book: true
        }
    });

    return {
        status: 200,
        data: carts
    }
});