<script setup lang="ts">
import type { Comment, User } from "@prisma/client";
import "tailwindcss/tailwind.css";
import { BusinessOutline, EarthOutline } from "@vicons/ionicons5";
import { BarcodeFilled } from "@vicons/material";

defineProps<{
  comment: Comment & {
    user: User;
  };
}>();
</script>

<template>
  <n-layout>
    <n-layout has-sider>
      <n-layout-sider width="50">
        <div class="pt-2"></div>
        <n-avatar :size="48" :src="comment.user.avatar ?? ''" />
      </n-layout-sider>
      <n-layout>
        <n-layout-header> </n-layout-header>
        <n-layout-content class="pl-4">
          <div class="h-2"></div>
          <div>
            <n-input
              v-model:value="value"
              type="textarea"
              placeholder="基本的 Textarea"
            />
          </div>
          <div class="h-4"></div>
          <n-button type="info"> Comment </n-button>
        </n-layout-content>
        <n-layout-footer></n-layout-footer
      ></n-layout>
    </n-layout>
  </n-layout>
</template>
