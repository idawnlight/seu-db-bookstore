<script setup lang="ts">
import { Search } from '@vicons/ionicons5'

const cart = useCartStore()
const searchKey = ref('')

const booksReq = await useFetch('/api/book/list', {
    query: {
        keyword: searchKey
    }
})
const books = computed(() => {
    const data = booksReq.data?.value;
    if (data && 'data' in data) {
        return data.data;
    }
})

let searchTimer = setTimeout(() => {}, 0);
const onSearch = (value: string) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        searchKey.value = value;
    }, 200)
}
</script>

<template>
    <n-input placeholder="Search" @input="onSearch" class="mb-4">
        <template #prefix>
            <n-icon>
                <Search />
            </n-icon>
        </template>
    </n-input>
    <div class="grid gap-2 grid-cols-6">
        <BookItem v-for="book in books" :book="book" @add-to-cart="cart.add(book.id)" :key="book.id"></BookItem>
    </div>
    <div v-if="books && books.length === 0" class="text-xl">No books found.</div>
</template>
