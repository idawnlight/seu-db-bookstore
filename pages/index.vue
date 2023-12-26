<script setup lang="ts">
const route = useRoute()

const books = (await useFetch('/api/book/list')).data
</script>

<template>
    <div class="grid gap-2 grid-cols-6">
        <BookItem v-for="book in books?.data" :book="book"></BookItem>
    </div>

    <NuxtLink to="/hello">
        <n-button>Go to Hello page</n-button>
    </NuxtLink>
</template>
