<script setup lang="ts">
import type { Book } from '@prisma/client';
import { BusinessOutline, EarthOutline } from "@vicons/ionicons5";
import { BarcodeFilled } from "@vicons/material";

const props = defineProps<{
    book: Book
}>()

const auth = useAuthStore()
const isAdmin = ref(false)
watchEffect(async () => {
    isAdmin.value = await auth.role('admin')
})

const quantity = ref(1)
const cart = useCartStore()

const addQuantityToCart = (id: number) => {
    cart.add(
        id,
        quantity.value
    )
}

const showModal = ref(false)
const checkout = () => {
    showModal.value = true
}
const handleCancel = () => {
    showModal.value = false
}
const orderConfirmed = () => {
    showModal.value = false
    navigateTo('/orders')
}

const currentBook = computed(() => {
    return [{
        book: props.book,
        quantity: quantity.value
    }]
})
</script>

<template>
    <OrderModal :show-modal="showModal" @cancel="handleCancel" @confirmed="orderConfirmed" :books="currentBook" />

    <n-layout has-sider>
        <n-layout-sider content-style="padding: 10px;" width="350">
            <n-image width="330" class="carousel-img" :src="book.cover || '/images/cover_placeholder.png'" />
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

                    <div class="flex space-x-4">
                        <div class="text-xl font-semibold">¥{{ (book.price / 100).toFixed(2) }}</div>
                        <div v-if="auth.loggedIn" class="flex space-x-4">
                            <n-input-number v-model:value="quantity" />
                            <n-button type="info" @click.stop="checkout">Buy</n-button>
                            <n-button strong secondary type="info" @click="() => addQuantityToCart(book.id)">Add to Cart</n-button>
                        </div>
                        <div v-if="isAdmin" class="flex space-x-4">
                            <n-button dashed type="info" @click="() => navigateTo(`/book/edit/${book.id}`)">Edit</n-button>
                        </div>
                    </div>
                </div>
            </n-layout-content>
            <n-layout-footer></n-layout-footer>
        </n-layout>
    </n-layout>
</template>
