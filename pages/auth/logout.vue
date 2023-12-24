<script setup>
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
await auth.logout()

// Redirect to home page
navigateTo('/')
</script>

<template>

</template>