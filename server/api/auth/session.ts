export default defineEventHandler(async (event) => {
    if (event.context.auth.role("user")) {
        return {
            status: 200,
            data: {
                "userId": event.context.auth.user.id,
                "info": event.context.auth.user,
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
