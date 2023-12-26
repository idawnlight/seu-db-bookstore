<script setup lang="ts">
const route = useRoute()

const auth = useAuthStore()
const cart = useCartStore()
await callOnce(async () => {
    await auth.fetch()
    await cart.fetch()
})
</script>

<template>
    <Header />

    <n-notification-provider>
        <div class="py-4 px-8">
            <NuxtPage />
        </div>
    </n-notification-provider>
</template>
