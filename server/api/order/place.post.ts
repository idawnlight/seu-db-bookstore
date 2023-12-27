import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    if (!event.context.auth.role("user")) {
        return {
            status: 401,
            error: "Unauthorized",
        };
    }

    const req = await readBody(event)
    if (!req.data) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            id: event.context.auth.user.id
        }
    })
    if (!user || !user.address) {
        return {
            status: 400,
            error: "Bad Request",
        };
    }

    try {
        const order = await prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    buyerId: event.context.auth.user.id,
                    address: user.address || '',
                }
            })

            for (const item of req.data) {
                if (!item.bookId || !item.quantity) {
                    throw new Error("Bad Request");
                }

                const book = await tx.book.findUnique({
                    where: {
                        id: item.bookId
                    }
                })

                if (!book) {
                    throw new Error("Book not found");
                }

                if (book.stock < item.quantity) {
                    throw new Error("Not enough stock");
                }
                await tx.book.update({
                    where: {
                        id: item.bookId
                    },
                    data: {
                        stock: book.stock - item.quantity
                    }
                })

                const orderItem = await tx.orderItem.create({
                    data: {
                        orderId: order.id,
                        bookId: item.bookId,
                        amount: item.quantity,
                        bookPrice: book.price,
                    }
                })
            }

            return order;
        })

        return {
            status: 200,
            data: {
                message: "Order placed.",
                order: order
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            error: "Bad Request",
        };
    }
});