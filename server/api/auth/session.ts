export default defineEventHandler(async (event) => {
    if (event.context.auth) {
        return {
            status: 200,
            data: {
                "userId": event.context.auth.user.id,
            },
        };
    } else {
        return {
            status: 401,
            body: {
                error: "Unauthorized",
            },
        };
    }
});
