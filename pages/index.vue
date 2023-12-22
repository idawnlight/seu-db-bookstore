<script setup lang="ts">
const route = useRoute()

import { NButton } from 'naive-ui'
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
  <NuxtLink to="/hello"><n-button>Go to Hello page</n-button></NuxtLink>
</template>
