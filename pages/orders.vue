<script setup lang="ts">

const orders = useFetch('/api/order/list')
const orderList = computed(() => {
    const data = orders.data.value
    if (data && 'data' in data) {
        for (const order of data.data) {
            order.createdAt = new Date(order.createdAt).toLocaleString()
        }
        return data.data
    }
})

</script>

<template>
    <div class="text-3xl font-semibold">My Orders</div>
    <div class="h-10"></div>
    <div v-if="orderList && orderList.length === 0" class="text-xl">No orders yet.</div>
    <div class="flex flex-col gap-4">
        <OrderItem v-for="order in orderList" :key="order.id" :order="order"></OrderItem>
    </div>
</template>
