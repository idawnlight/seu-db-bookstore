<script setup lang="ts">
import type { Book } from '@prisma/client';
import "tailwindcss/tailwind.css";
import { BusinessOutline, EarthOutline } from "@vicons/ionicons5";
import { BarcodeFilled } from "@vicons/material";

defineProps<{
    book: Book
}>()
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider content-style="padding: 10px;" width="350">
      <n-carousel show-arrow>
        <img
          width="330"
          class="carousel-img"
          :src="book.cover ?? ''"
        />
      </n-carousel>
    </n-layout-sider>
    <n-layout>
      <n-layout-header> </n-layout-header>
      <n-layout-content>
        <div class="pl-10">
          <div class="text-2xl font-semibold">{{ book.title }}</div>
          <div>by {{ book.author }}</div>
          <n-divider />
          <div>
            {{ book.description }}
          </div>
          <n-divider />
          <n-grid x-gap="12" :cols="5">
            <!-- <n-gi>
              <div class="flex flex-col items-center">
                <div>Language</div>
                <div class="h-2.5"></div>
                <n-icon size="30">
                  <EarthOutline />
                </n-icon>
                <div class="font-semibold">English</div>
              </div>
            </n-gi> -->
            <n-gi>
              <div class="flex flex-col items-center">
                <div>Publisher</div>
                <div class="h-2.5"></div>
                <n-icon size="30">
                  <BusinessOutline />
                </n-icon>
                <div class="font-semibold">{{ book.publisher }}</div>
              </div>
            </n-gi>
            <n-gi>
              <div class="flex flex-col items-center">
                <div>ISBN</div>
                <div class="h-2.5"></div>
                <n-icon size="30">
                  <BarcodeFilled />
                </n-icon>
                <div class="font-semibold">{{ book.isbn }}</div>
              </div>
            </n-gi>
            <!-- <n-gi>
              <div class="flex flex-col items-center">
                <div>Edition</div>
                <div class="h-2.5"></div>
                <div class="text-2xl">#</div>
                <div class="font-semibold">{{ edition }}</div>
              </div>
            </n-gi> -->
          </n-grid>

          <n-divider />

          <div class="flex space-x-5">
            <div class="text-xl font-semibold">¥{{ book.price / 100 }}.{{ (book.price % 100).toString().padEnd(2, '0')  }}</div>
            <n-input-number v-model:value="value" clearable />
            <n-button type="info"> Buy </n-button>
            <n-button strong secondary type="info"> Add to Cart </n-button>
          </div>
        </div>
      </n-layout-content>
      <n-layout-footer></n-layout-footer>
    </n-layout>
  </n-layout>
</template>