export default defineEventHandler(async (event) => {
    setCookie(event, "token", "", {
        httpOnly: true,
    });
});