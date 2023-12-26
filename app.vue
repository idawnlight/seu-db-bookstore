<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const route = useRoute()

const auth = useAuthStore()
await callOnce(async () => {
    await auth.fetch()
})
</script>

<template>
    <Header />

    <div class="py-4 px-8">
        <n-notification-provider>
            <NuxtPage />
        </n-notification-provider>
    </div>
</template>
