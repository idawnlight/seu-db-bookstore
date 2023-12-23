import { createToken } from "~/server/helpers/jwt";

export default defineEventHandler(async (event) => {
    const token = createToken({ userId: "123" });
    setCookie(event, "token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return parseCookies(event);
});
