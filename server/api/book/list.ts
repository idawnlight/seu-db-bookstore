import prisma from "~/server/helpers/prisma";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const keyword = query.keyword as string;

    console.log('keyword', keyword);

    if (!keyword) {
        const books = await prisma.book.findMany();
        return {
            status: 200,
            data: books
        }
    } else {
        const books = await prisma.book.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: keyword
                        }
                    },
                    {
                        author: {
                            contains: keyword
                        }
                    },
                    {
                        description: {
                            contains: keyword
                        }
                    }
                ]
            }
        });

        return {
            status: 200,
            data: books
        }
    }
});