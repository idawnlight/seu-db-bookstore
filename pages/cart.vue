<script setup>
const cart = useCartStore()

const cartCount = ref(0)
watchEffect(async () => {
    cartCount.value = await cart.getCount()
})

const selectedBooks = ref([])
const handleUpdateValue = (value) => {
    selectedBooks.value = value
    console.log(selectedBooks.value)
}

const cartTotal = ref(0)
watchEffect(async () => {
    cartTotal.value = cart.items.reduce((total, item) => {
        return selectedBooks.value.includes(item.book.id) ? total + item.book.price * item.quantity : total
    }, 0)
    console.log(cartTotal.value)
})

const handleChange = (book, value) => {
    cart.update(book.id, value)
    // console.log(book, value)
}
</script>

<template>
    <n-checkbox-group :value="selectedBooks" @update:value="handleUpdateValue">
        <n-list bordered>
            <template #header>
                <div class="flex justify-between items-center">
                    <div class="font-bold text-2xl">Cart</div>
                    <div>There are {{ cartCount }} items in your cart.</div>
                </div>
            </template>
            <template #footer>
                <div v-if="!cartCount" class="flex justify-center items-center">
                    <div class="text-2xl">Your cart is empty.</div>
                </div>
                <div v-else>
                    <div class="flex justify-between items-center">
                        <div>Total <div class="text-2xl">¥{{ cartTotal / 100 }}</div></div>
                        <n-button type="primary" :disabled="!selectedBooks.length">Checkout</n-button>
                    </div>
                </div>
            </template>

            <n-list-item v-for="item in cart.items" :key="item.book.id">
                <template #prefix>
                    <n-checkbox :value="item.book.id"></n-checkbox>
                </template>
                <template #suffix>
                    <n-input-number :value="item.quantity" button-placement="both" @update:value="(v) => handleChange(item.book, v)" class="w-24" />
                </template>
                <n-thing :title="item.book.title" :description="item.book.author">
                    <template #avatar>
                        <n-image width="80" :src="item.book.cover || '/images/cover_placeholder.png'" />
                    </template>
                </n-thing>
            </n-list-item>
        </n-list>
    </n-checkbox-group>
</template>