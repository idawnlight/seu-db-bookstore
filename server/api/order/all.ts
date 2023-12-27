import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("admin")) {
        return {
            status: 401,
            message: "Unauthorized",
        }
    }

    const orders = await prisma.order.findMany({
        include: {
            items: {
                include: {
                    book: true
                }
            },
            buyer: true
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