<script setup lang="ts">
import { CartOutline, ArrowDown, LogOutOutline, PersonCircleOutline, BookOutline, ConstructOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const route = useRoute()
const auth = useAuthStore()
const cart = useCartStore()

const cartCount = ref(0)
watchEffect(async () => {
    cartCount.value = await cart.getCount()
})

const renderIcon = (icon: Component) => {
    return () => {
        return h(NIcon, null, {
            default: () => h(icon)
        })
    }
}
const userActions = ref([
    {
        label: 'Profile',
        key: '/profile',
        icon: renderIcon(PersonCircleOutline)
    },
    {
        label: 'My Orders',
        key: '/orders',
        icon: renderIcon(BookOutline)
    },
    {
        label: 'Logout',
        key: '/auth/logout',
        icon: renderIcon(LogOutOutline)
    }
])

const isAdmin = ref(false)
watchEffect(async () => {
    isAdmin.value = await auth.role('admin')
    if (isAdmin.value && !userActions.value.find((action) => action.key === '/admin')) {
        userActions.value.push({
            label: 'Admin',
            key: '/admin',
            icon: renderIcon(ConstructOutline)
        })
    } else if (!isAdmin.value && userActions.value.find((action) => action.key === '/admin')) {
        userActions.value = userActions.value.filter((action) => action.key !== '/admin')
    }
})

const handleAction = (key: string) => {
    navigateTo(key)
}
</script>

<template>
    <div class="flex py-4 px-8 justify-between items-center">
        <NuxtLink to="/" class="no-underline">
            <div class="flex">
                <h1 class="text-3xl">The BookStore</h1>
                <p class="text-xl">&trade;</p>
                <!--<p>Current route: {{ route.path }}</p>-->
            </div>
        </NuxtLink>
        <div class="flex gap-2">
            <div v-if="auth.loggedIn" class="flex gap-2 items-center">
                <n-button secondary strong @click="navigateTo('/cart')">
                    <template #icon>
                        <n-icon>
                            <CartOutline />
                        </n-icon>
                    </template>
                    {{ cartCount }} books in Cart
                </n-button>
                <n-dropdown trigger="hover" placement="bottom-start" :options="userActions" @select="handleAction"
                    size="large">
                    <n-button>Hello,&nbsp;<strong>{{ auth.info.name }}</strong>&nbsp;<n-icon>
                            <ArrowDown />
                        </n-icon></n-button>
                </n-dropdown>
                <n-avatar round size="small"
                    :src="auth.info.avatar || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'"
                    @click="navigateTo('/profile')" />
            </div>
            <div v-else class="flex gap-2 items-center">
                <n-button @click="navigateTo('/auth/login')">Login</n-button>
                <n-button @click="navigateTo('/auth/register')">Register</n-button>
            </div>
        </div>
    </div>
</template>

<style>
a:visited {
    color: inherit;
}
</style>