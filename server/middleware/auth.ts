import { verifyToken } from "~/server/helpers/jwt";
import prisma from "../helpers/prisma";

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event);
    const token = cookies.token;
    try {
        const payload = verifyToken(token);
        const userId = payload.userId;
        const user = await prisma.user.findUnique({ where: { id: userId } })
        event.context.auth = {
            user: user,
        }
    } catch (error) {
        event.context.auth = null
    }
})