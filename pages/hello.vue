<script setup lang="ts">
const { data } = await useFetch('/api/hello')

import { NButton } from 'naive-ui'
</script>

<template>
  <pre>{{ data }}</pre>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <n-button>hello</n-button>
</template>