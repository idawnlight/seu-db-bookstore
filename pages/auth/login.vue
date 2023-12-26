<script setup>
import { useNotification } from 'naive-ui'

const auth = useAuthStore()
const notification = useNotification()

const username = ref('')
const password = ref('')

const login = async () => {
    const result = await auth.login(username.value, password.value)
    if (result) {
        notification.success({
            title: 'Login success',
            content: 'Welcome back!'
        })
        navigateTo('/')
    }
    else notification.error({
        title: 'Login failed',
        content: 'Please check your username and password.'
    })
}
</script>

<template>
    <div class="flex flex-col items-center justify-center pt-12">
        <h1 class="text-3xl font-bold">Login</h1>
        <n-form label-placement="left" label-width="80" class="mt-4 w-80">
            <n-form-item label="Username">
                <n-input v-model:value="username" placeholder="Email or username" />
            </n-form-item>
            <n-form-item label="Password">
                <n-input v-model:value="password" type="password" placeholder="Password" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="login">
                    Login
                </n-button>
            </div>
        </n-form>
    </div>
</template>