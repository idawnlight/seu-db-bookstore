export const useAuthStore = defineStore("authStore", {
    state: () => ({
        loggedIn: false,
        userId: "",
    }),
    actions: {
        async fetch() {
            const session = await $fetch("/api/auth/session");

            if (session.data?.userId) {
                this.userId = session.data.userId;
                this.loggedIn = true;
            }
        },

        async login({ username, password }) {
            const res = await $fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });

            console.log(res);

            if (res.data?.userId) {
                this.userId = res.data.userId;
                this.loggedIn = true;
                return true;
            } else {
                return false;
            }
        },

        async logout() {
            await $fetch("/api/auth/logout", { method: "POST" });
            this.loggedIn = false;
            this.userId = "";
        }
    },
});
