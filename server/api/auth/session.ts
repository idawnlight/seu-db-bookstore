import { verifyToken } from "~/server/helpers/jwt";

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event);
    const token = cookies.token;
    try {
        const payload = verifyToken(token);
        return {
            body: {
                "userId": payload.userId,
            },
        };
    } catch (error) {
        return {
            status: 401,
            body: {
                error: "Unauthorized",
            },
        };
    }
});
