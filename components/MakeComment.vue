<script setup lang="ts">
import type { User } from "@prisma/client";

defineProps<{
    user: User
}>();

defineEmits<{
    (c: 'addComment', comment: string): void
}>()

const comment = ref('');
</script>

<template>
    <n-layout>
        <n-layout has-sider>
            <n-layout-sider width="50">
                <div class="pt-2" />
                <n-avatar round :size="48" :src="user.avatar || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'" />
            </n-layout-sider>
            <n-layout>
                <n-layout-header></n-layout-header>
                <n-layout-content class="pl-4">
                    <div class="h-2"></div>
                    <div>
                        <n-input v-model:value="comment" type="textarea" placeholder="Write a comment..." />
                    </div>
                    <div class="h-4"></div>
                    <n-button type="info" @click="$emit('addComment', comment)">Comment</n-button>
                </n-layout-content>
                <n-layout-footer></n-layout-footer></n-layout>
        </n-layout>
    </n-layout>
</template>
