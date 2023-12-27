<script setup lang="ts">
import type { Book, Order, OrderItem } from "@prisma/client";

const props = defineProps<{
    order: Order & {
        items: [
            OrderItem & {
                book: Book;
            }
        ];
    };
}>();

const totalPrice = ref(0);
watchEffect(() => {
    totalPrice.value = props.order.items.reduce(
        (acc, cur) => acc + cur.bookPrice * cur.amount,
        0
    );
});
</script>

<template>
    <n-list bordered>
        <template #header>
            <div class="text-2xl font-semibold flex justify-between">
                <div>Order #{{ order.id }}</div>
                <div>Confirmed</div>
            </div>
            <div class="text-lg flex justify-between">
                <div>{{ order.createdAt }}</div>
                <div>Shipping to <i>{{ order.address }}</i></div>
            </div>
        </template>
        <template #footer>
            <div>
                Total
                <div class="text-2xl">¥{{ (totalPrice / 100).toFixed(2) }}</div>
            </div>
        </template>
        <n-list-item v-for="item in order.items" :key="item.book.id">
            <template #suffix>
                <div class="text-xl font-semibold">¥{{ (item.bookPrice / 100).toFixed(2) }}</div>
                <div class="flex flex-row-reverse text-lg">×{{ item.amount }}</div>
            </template>
            <n-thing :title="item.book.title" :description="item.book.author">
                <template #avatar>
                    <n-image width="80" :src="item.book.cover || '/images/cover_placeholder.png'" />
                </template>
            </n-thing>
        </n-list-item>
    </n-list>
</template>
