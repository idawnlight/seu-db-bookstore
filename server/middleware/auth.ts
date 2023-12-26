import { verifyToken } from "~/server/helpers/jwt";
import prisma from "../helpers/prisma";

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event);
    const token = cookies.token;
    try {
        const payload = verifyToken(token);
        const userId = payload.userId;
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user) {
            throw new Error("User not found")
        }
        user.password = "";
        event.context.auth = {
            user: user,
            role: (role: string) => {
                return user.roles.indexOf(role) !== -1
            }
        }
    } catch (error) {
        event.context.auth = {
            user: null,
            role: (role: string) => { return false }
        }
    }
})