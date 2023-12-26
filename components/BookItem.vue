<template>
    <n-card hoverable>
        <template #cover>
            <img :src="book.cover ?? '/images/cover_placeholder.png'">
        </template>
        <div class="pt-3 text-lg font-semibold">{{ book.title }}</div>
        <div>{{ book.author }}</div>
        <div class="flex items-start">
            <div class="pt-0.5">¥</div>
            <div class="text-2xl">{{ Math.floor(book.price / 100) }}</div>
            <div class="pt-0.5">{{ (book.price % 100).toString().padEnd(2, '0') }}</div>
        </div>
    </n-card>
</template>

<script setup lang="ts">
import type { Book } from '@prisma/client';

defineProps<{
    book: Book
}>()
</script>

<style scoped>
.n-card {
    max-width: 300px;
}
</style>