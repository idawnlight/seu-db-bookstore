<script setup lang="ts">
import type { Comment, User } from '@prisma/client';

defineProps<{
    comment: Comment & {
        user: User
    }
}>()
</script>

<template>
    <n-layout>
        <n-layout>
            <n-layout-header> </n-layout-header>
            <n-layout-content>
                <div class="flex space-x-5">
                    <n-avatar :size="48" :src="comment.user.avatar ?? 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'" />
                    <div>
                        <div class="text-lg">{{ comment.user.name }}</div>
                        <div>Commented on {{ comment.createdAt }}</div>
                    </div>
                </div>
                <div class="h-2"></div>
                <div>
                    {{ comment.content }}
                </div>
            </n-layout-content>
            <n-layout-footer></n-layout-footer>
        </n-layout>
    </n-layout>
</template>
