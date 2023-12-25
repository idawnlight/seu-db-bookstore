<template>
  <n-card hoverable>
    <template #cover>
      <img :src="cover ?? '/images/cover_placeholder.png'">
    </template>
    <div class="h-3"></div>
    <div class="text-lg font-semibold">{{ title }}</div>
    <div>{{ author }}</div>
    <div class="flex items-start">
        <div class="pt-0.5">¥</div>
        <div class="text-2xl">{{ priceHead }}</div>
        <div class="pt-0.5">{{ priceTail }}</div>
    </div>
  </n-card>
</template>

<script setup>
  defineProps(['title', 'author', 'priceHead', 'priceTail', 'cover'])
</script>

<style scoped>
.n-card {
  max-width: 300px;
}
</style>