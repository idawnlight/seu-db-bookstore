<script setup lang="ts">
const route = useRoute()

const books = (await useFetch('/api/book/list')).data
</script>

<template>
    <div class="grid gap-2 grid-cols-6">
        <BookItem v-for="book in books?.data" :title="book.title" :author="book.author"
            :price-head="Math.floor(book.price / 100)" :price-tail="(book.price % 100).toString().padEnd(2, '0')">
            {{ book.title }}
        </BookItem>
    </div>

    <NuxtLink to="/hello">
        <n-button>Go to Hello page</n-button>
    </NuxtLink>
</template>
