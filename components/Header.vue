<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const auth = useAuthStore()
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
                <NuxtLink to="/auth/logout">
                    <n-button>Logout</n-button>
                </NuxtLink>
            </div>
            <div v-else class="flex gap-2 items-center">
                <NuxtLink to="/auth/login">
                    <n-button>Login</n-button>
                </NuxtLink>
                <NuxtLink to="/auth/register">
                    <n-button>Register</n-button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style>
a:visited {
    color: inherit;
}
</style>