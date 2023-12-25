import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    const books = await prisma.book.findMany();
    return {
        status: 200,
        data: books
    }
});