import type { Book } from "@prisma/client";

export const useCartStore = defineStore("cartStore", {
    state: () => ({
        items: <{ book: Book; quantity: number }[]>[],
    }),
    actions: {
        async fetch() {
            const res = await $fetch("/api/cart/list");

            if (res.status === 200) {
                // @ts-ignore
                res.data.sort((a, b) => a.id - b.id);
                // @ts-ignore
                this.items = res.data.map((item) => ({
                    book: item.book,
                    quantity: item.quantity,
                }));
            }
        },

        async add(bookId: number, quantity: number = 1) {
            const res = await $fetch("/api/cart/add", {
                method: "POST",
                body: JSON.stringify({ bookId, quantity }),
            });

            if (res.status === 200) {
                await this.fetch();
                return true;
            } else {
                return false;
            }
        },

        async update(bookId: number, quantity: number) {
            const res = await $fetch("/api/cart/update", {
                method: "POST",
                body: JSON.stringify({ bookId, quantity }),
            });

            if (res.status === 200) {
                await this.fetch();
                return true;
            } else {
                return false;
            }
        },

        async getCount() {
            return this.items.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
        }
    },
});
