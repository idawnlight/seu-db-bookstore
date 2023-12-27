<script setup lang="ts">
import type { Book, Order, OrderItem } from "@prisma/client";

const props = defineProps<{
  order: Order & {
    orderItem: [
      OrderItem & {
        book: Book;
      }
    ];
  };
}>();

const totalPrice = ref(0);
for (var i = 0; i < props.order.orderItem.length; ++i) {
  totalPrice.value +=
    props.order.orderItem[i].bookPrice * props.order.orderItem[i].amount;
}
</script>

<template>
  <n-list bordered>
    <template #header> <div class="text-lg">{{ order.createdAt.toDateString() }}</div> </template>
    <template #footer>
      <div>
        Total
        <div class="text-2xl">¥{{ (totalPrice / 100).toFixed(2) }}</div>
      </div></template
    >
    <n-list-item v-for="item in order.orderItem" :key="item.book.id">
      <template #prefix>
        <n-image
          width="80"
          :src="item.book.cover || '/images/cover_placeholder.png'"
        />
      </template>
      <template #suffix>
        <div class="text-xl font-semibold">¥{{ (item.bookPrice / 100).toFixed(2) }}</div>
        <div class="flex flex-row-reverse text-lg">×{{ item.amount }}</div>
      </template>
      <n-thing :title="item.book.title" :description="item.book.author">
        <div class="h-10"></div>
      </n-thing>
    </n-list-item>
  </n-list>
</template>
