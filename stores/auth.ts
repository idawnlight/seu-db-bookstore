import type { User } from "@prisma/client";

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        loggedIn: false,
        userId: "",
        info: <User>{},
    }),
    actions: {
        async fetch() {
            const session = await $fetch("/api/auth/session");

            // @ts-ignore
            if (session.data?.userId) {
                // @ts-ignore
                this.userId = session.data.userId;
                this.loggedIn = true;
                // @ts-ignore
                this.info = session.data.info;
            }
        },

        async login(username: string, password: string) {
            const res = await $fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });

            // @ts-ignore
            if (res.data?.userId) {
                await this.fetch();
                return true;
            } else {
                return false;
            }
        },

        async register(newUser: User) {
            const res = await $fetch("/api/auth/register", {
                method: "POST",
                body: newUser,
            });

            // @ts-ignore
            if (res.data?.userId) {
                await this.fetch();
                return true;
            } else {
                return false;
            }
        },

        async logout() {
            await $fetch("/api/auth/logout", { method: "POST" });
            this.loggedIn = false;
            this.userId = "";
        },

        async role(role: string) {
            if (!this.loggedIn) {
                return false;
            }
            return this.info.roles.includes(role);
        }
    },
});
