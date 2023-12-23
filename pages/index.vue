<script setup lang="ts">
const route = useRoute()
</script>

<template>
    <div>
        <h1>Nuxt Routing set up successfully!</h1>
        
        <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
    </div>
    <NuxtLink to="/hello">
        <n-button>Go to Hello page</n-button>
    </NuxtLink>
</template>
