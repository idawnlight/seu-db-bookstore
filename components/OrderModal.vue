<script setup lang="ts">
import type { Book } from "@prisma/client";

const auth = useAuthStore()

const props = defineProps<{
    showModal: boolean,
    books: { book: Book; quantity: number }[]
}>();

const emits = defineEmits<{
    (c: 'cancel'): void,
    (c: 'confirmed'): void
}>()

const submitOrder = () => {
    emits('confirmed')
}
</script>

<template>
    <n-modal :show="showModal">
        <n-card style="width: 600px" title="Review & Submit" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <p class="mt-0">Your order include the following items:</p>
            <n-table :bordered="false" :single-line="false" size="small">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in books" :key="item.book.id">
                        <td>{{ item.book.title }}</td>
                        <td>¥{{ (item.book.price / 100).toFixed(2) }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>¥{{ ((item.book.price * item.quantity) / 100).toFixed(2) }}</td>
                    </tr>
                </tbody>
            </n-table>
            <n-divider />
            <p>Shipping Address: <strong>{{ auth.info.address }}</strong></p>
            <i>You can update your shipping address in your profile.</i>
            <n-divider />
            <p class="text-right">Grand Total: <span class="text-2xl">¥{{ ((books.reduce((total, item) => {
                return total + item.book.price * item.quantity
            }, 0)) / 100).toFixed(2) }}</span></p>
            <template #footer>
                <div class="flex flex-row-reverse gap-4">
                    <n-button type="primary" @click="submitOrder" class="flex">
                        Confirm Order
                    </n-button>
                    <n-button @click="$emit('cancel')" class="flex">
                        Cancel
                    </n-button>
                </div>
            </template>
        </n-card>
    </n-modal>
</template>