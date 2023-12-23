<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const route = useRoute()
const auth = useAuthStore()
await auth.fetch()
</script>

<template>
    <Header />
    
    <div class="m-4">
        <NuxtPage />
    </div>
</template>
