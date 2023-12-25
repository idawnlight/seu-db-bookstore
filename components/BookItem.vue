<template>
  <n-card hoverable>
    <template #cover>
      <img src="https://codex.cs.yale.edu/avi/db-book/images/db7-cover.jpg">
    </template>
    <div class="h-3"></div>
    <div class="text-lg font-semibold">{{ title }}</div>
    <div>{{ author }}</div>
    <div class="flex items-start">
        <div class="pt-0.5">$</div>
        <div class="text-2xl">{{ priceHead }}</div>
        <div class="pt-0.5">{{ priceTail }}</div>
    </div>
  </n-card>
</template>

<script setup>
  import "tailwindcss/tailwind.css"

  defineProps(['title', 'author', 'priceHead', 'priceTail'])
</script>

<style scoped>
.n-card {
  max-width: 300px;
}
</style>