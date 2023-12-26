<script setup lang="ts">
import type { Comment, User } from '@prisma/client';
import "tailwindcss/tailwind.css";
import { BusinessOutline, EarthOutline } from "@vicons/ionicons5";
import { BarcodeFilled } from "@vicons/material";

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
          <n-avatar
            :size="48"
            :src="comment.user.avatar ?? ''"
          />
          <div>
            <div class="text-lg">{{ comment.user.username }}</div>
            <div>Commented on {{ comment.createdAt.toDateString() }}</div>
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
