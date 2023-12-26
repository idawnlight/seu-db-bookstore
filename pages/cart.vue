<script setup>
import { ArrowForward } from '@vicons/ionicons5';

const cart = useCartStore()

const cartCount = ref(0)
watchEffect(async () => {
    cartCount.value = await cart.getCount()
})

const selectAllChecked = ref(false)
const selectedBooks = ref([])
const handleUpdateValue = (value) => {
    selectedBooks.value = value
    selectAllChecked.value = value.length === cart.items.length
}
const selectedCartItems = computed(() => {
    return cart.items.filter((item) => {
        return selectedBooks.value.includes(item.book.id)
    })
})

const cartTotal = ref(0)
watchEffect(async () => {
    cartTotal.value = cart.items.reduce((total, item) => {
        return selectedBooks.value.includes(item.book.id) ? total + item.book.price * item.quantity : total
    }, 0)
})

const handleChange = (book, value) => {
    cart.update(book.id, value)
}

const showModal = ref(false)
const checkout = () => {
    showModal.value = true
}
const handleCancel = () => {
    showModal.value = false
}
const orderConfirmed = () => {
    showModal.value = false
    for (const bookId of selectedBooks.value) {
        cart.update(bookId, 0)
    }
    navigateTo('/orders')
}

const selectAll = (value) => {
    if (value) {
        selectedBooks.value = cart.items.map((item) => item.book.id)
        selectAllChecked.value = true
    } else {
        selectedBooks.value = []
        selectAllChecked.value = false
    }
}
</script>

<template>
    <OrderModal :show-modal="showModal" @cancel="handleCancel" @confirmed="orderConfirmed" :books="selectedCartItems" />

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
                    <div class="flex items-center gap-4">
                        <n-checkbox :checked="selectAllChecked" @update:checked="selectAll" />
                        <div>
                            Total <div class="text-2xl">¥{{ (cartTotal / 100).toFixed(2) }}</div>
                        </div>
                    </div>
                    <n-button type="primary" :disabled="!selectedBooks.length" icon-placement="right"
                        @click.stop="checkout">
                        <template #icon>
                            <n-icon>
                                <ArrowForward />
                            </n-icon>
                        </template>
                        Checkout
                    </n-button>
                </div>
            </div>
        </template>

        <n-checkbox-group :value="selectedBooks" @update:value="handleUpdateValue"
            style="border-bottom: 1px solid var(--n-merged-border-color)">
            <n-list-item v-for="item in cart.items" :key="item.book.id">
                <template #prefix>
                    <n-checkbox :value="item.book.id"></n-checkbox>
                </template>
                <template #suffix>
                    <p class="text-xl"><strong>¥{{ (item.book.price / 100).toFixed(2) }}</strong></p>
                    <n-input-number :value="item.quantity" button-placement="both"
                        @update:value="(v) => handleChange(item.book, v)" class="w-24" />
                </template>
                <n-thing :title="item.book.title" :description="item.book.author"
                    @click.stop="navigateTo('/book/' + item.book.id)">
                    <template #avatar>
                        <n-image width="80" :src="item.book.cover || '/images/cover_placeholder.png'" />
                    </template>
                </n-thing>
            </n-list-item>
        </n-checkbox-group>
    </n-list>
</template>