<script setup lang="ts">
import type { Book } from "@prisma/client";

const book = ref(<Book>{
  title: "",
  author: "",
  price: 10000,
  publisher: "",
  isbn: "",
  cover: "",
  stock: 1,
  description: "",
});

const orders = useFetch("/api/order/all");
const orderList = computed(() => {
  const data = orders.data.value;
  if (data && "data" in data) {
    for (const order of data.data) {
      order.createdAt = new Date(order.createdAt).toLocaleString();
    }
    return data.data;
  }
});
</script>

<template>
  <!-- <n-button @click="navigateTo('/book/add')">Add Book</n-button> -->

  <n-tabs
    :key="'lineleft'"
    :type="'line'"
    animated
    :placement="'left'"
    :style="{ height: '1000px' }"
  >
    <n-tab-pane name="addBook" tab="Add Book">
      <edit-book :book="book"></edit-book>
    </n-tab-pane>
    <n-tab-pane name="orderManagement" tab="Order Management">
      <div class="text-2xl font-semibold">Order Management</div>
      <n-divider />
      <order-table
        v-for="order in orderList"
        :key="order.id"
        :order="order"
      ></order-table>
    </n-tab-pane>
    <n-tab-pane name="userManagement" tab="User Management">
      <div v-if="book">
        <edit-book :book="book"></edit-book>
      </div>
    </n-tab-pane>
  </n-tabs>
</template>
