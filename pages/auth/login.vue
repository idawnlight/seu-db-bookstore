<script setup>
import { useAuthStore } from '~/stores/auth'
import { useNotification } from 'naive-ui'

const auth = useAuthStore()
const notification = useNotification()

const username = ref('')
const password = ref('')

const login = async () => {
    const result = await auth.login(username.value, password.value)
    if (result) {
        notification.success({
            title: '登录成功',
            content: '欢迎回来'
        })
        navigateTo('/')
    }
    else notification.error({
        title: '登录失败',
        content: '用户名或密码不正确'
    })
}
</script>

<template>
    <div class="flex flex-col items-center justify-center pt-12">
        <h1 class="text-3xl font-bold">登录</h1>
        <n-form label-placement="left" label-width="auto" class="mt-4 w-80">
            <n-form-item label="用户名">
                <n-input v-model:value="username" placeholder="Email or username" />
            </n-form-item>
            <n-form-item label="密码">
                <n-input v-model:value="password" type="password" placeholder="Password" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="login">
                    验证
                </n-button>
            </div>
        </n-form>
    </div>
</template>