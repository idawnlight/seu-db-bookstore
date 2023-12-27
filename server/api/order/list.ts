import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("user")) {
        return {
            status: 401,
            message: "Unauthorized",
        }
    }

    const userId = event.context.auth.user.id;
    const orders = await prisma.order.findMany({
        where: {
            buyerId: userId
        },
        include: {
            items: {
                include: {
                    book: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return {
        status: 200,
        data: orders
    }
});