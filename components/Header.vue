<script setup lang="ts">
import { CartOutline } from '@vicons/ionicons5'

const route = useRoute()
const auth = useAuthStore()
const cart = useCartStore()

const cartCount = ref(0)
watchEffect(async () => {
    cartCount.value = await cart.getCount()
})
</script>

<template>
    <div class="flex py-4 px-8 justify-between items-center">
        <NuxtLink to="/" class="no-underline">
            <div class="flex">
                <h1 class="text-3xl">BookStore</h1>
                <p>Current route: {{ route.path }}</p>
            </div>
        </NuxtLink>
        <div class="flex gap-2">
            <div v-if="auth.loggedIn" class="flex gap-2 items-center">
                <p>Hello {{ auth.info.name }}</p>
                <n-button secondary strong @click="navigateTo('/cart')">
                    <template #icon>
                        <n-icon>
                            <CartOutline />
                        </n-icon>
                    </template>
                    {{ cartCount }}
                </n-button>
                <n-button @click="navigateTo('/auth/logout')">Logout</n-button>
            </div>
            <div v-else class="flex gap-2 items-center">
                <n-button @click="navigateTo('/auth/login')">Login</n-button>
                <n-button @click="navigateTo('/auth/login')">Register</n-button>
            </div>
        </div>
    </div>
</template>

<style>
a:visited {
    color: inherit;
}
</style>