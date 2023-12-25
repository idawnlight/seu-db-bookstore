<script setup lang="ts">
const route = useRoute()

const books = (await useFetch('/api/book/list')).data
</script>

<template>
    <!-- <div>
        <h1>Nuxt Routing set up successfully!</h1>
        
        <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
    </div> -->
    <ol>
        <li v-for="book in books?.data">
            {{ book.title }}
        </li>
    </ol>
    <NuxtLink to="/hello">
        <n-button>Go to Hello page</n-button>
    </NuxtLink>
</template>
