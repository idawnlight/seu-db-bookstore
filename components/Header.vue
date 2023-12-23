<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const auth = useAuthStore()

await auth.fetch()
</script>

<template>
    <div class="flex py-4 px-8 justify-between">
        <div class="flex">
            <h1 class="text-3xl">BookStore</h1>
            <p>Current route: {{ route.path }}</p>
        </div>
        <div class="flex gap-2">
            <div :v-if="auth.loggedIn">
                <p>{{ auth.userId }}</p>
            </div>
            <NuxtLink to="/login">
                <n-button>Login</n-button>
            </NuxtLink>

            <NuxtLink to="/logout">
                <n-button>Logout</n-button>
            </NuxtLink>
        </div>
    </div>
</template>