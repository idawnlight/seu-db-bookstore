<script setup lang="ts">
import type { User } from '@prisma/client';
import { useNotification } from 'naive-ui'

const auth = useAuthStore()
const notification = useNotification()

const newUser = ref(<User>{
    username: '',
    password: '',
    email: '',
    name: '',
    address: '',
    phone: '',
})

const register = async () => {
    const result = await auth.register(newUser.value)
    if (result) {
        notification.success({
            title: 'Register success',
            content: 'Welcome!'
        })
        navigateTo('/')
    } else notification.error({
        title: 'Register failed',
        content: 'Please check your details.'
    })
}
</script>

<template>
    <div class="flex flex-col items-center justify-center pt-12">
        <h1 class="text-3xl font-bold">Register</h1>
        <n-form label-placement="left" label-width="80" class="mt-4 w-80">
            <p class="text-xl">Basic Information</p>
            <n-form-item label="Username">
                <n-input v-model:value="newUser.username" placeholder="Username" />
            </n-form-item>
            <n-form-item label="Password">
                <n-input v-model:value="newUser.password" type="password" placeholder="Password" />
            </n-form-item>
            <n-form-item label="Email">
                <n-input v-model:value="newUser.email" placeholder="Email" />
            </n-form-item>
            <n-divider />
            <p class="text-xl">Shipping Information</p>
            <n-form-item label="Name">
                <n-input v-model:value="newUser.name" placeholder="Name" />
            </n-form-item>
            <n-form-item label="Phone">
                <n-input v-model:value="newUser.phone" placeholder="Phone" />
            </n-form-item>
            <n-form-item label="Address">
                <n-input v-model:value="newUser.address" placeholder="Address" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="register">
                    Register
                </n-button>
            </div>
        </n-form>
    </div>
</template>