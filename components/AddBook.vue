<script setup lang="ts">
const book = ref({
    title: null,
    author: null,
    publisher: null,
    price: null,
    stock: null,
    isbn: null,
    cover: null,
    description: null,
})

const rules = ref({
    title: {
        required: true,
        trigger: 'blur',
        message: 'Please input title'
    },
    author: {
        required: true,
        trigger: 'blur',
        message: 'Please input author'
    },
    publisher: {
        required: true,
        trigger: 'blur',
        message: 'Please input publisher'
    },
    price: {
        required: true,
        trigger: 'blur',
        message: 'Please input price'
    },
    stock: {
        required: true,
        trigger: 'blur',
        message: 'Please input stock'
    },
    isbn: {
        required: true,
        trigger: 'blur',
        message: 'Please input isbn'
    },
    cover: {
        required: true,
        trigger: 'blur',
        message: 'Please input cover'
    },
    description: {
        required: true,
        trigger: 'blur',
        message: 'Please input description'
    },
})
</script>


<template>
    <n-layout>
        <div class="text-2xl font-semibold">
            Add Book
        </div>
        <n-divider />

        <n-form ref="formRef" :label-width="80" :model="book" :rules="rules">
            <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="8" label="Title" path="title">
                <n-input v-model:value="book.title" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="Author" path="author">
                <n-input v-model:value="book.author" clearable />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="Publisher" path="publisher">
                <n-input v-model:value="book.publisher" clearable />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="Isbn" path="isbn">
                <n-input v-model:value="book.isbn" clearable />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="Price" path="price">
                <n-input v-model:value="book.price" clearable placeholder="RMB" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="Stock" path="stock">
                <n-input v-model:value="book.stock" clearable />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="Description" path="description">
                <n-input v-model:value="book.description" clearable />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="Cover" path="cover">
                <n-input v-model:value="book.cover" clearable />
            </n-form-item-gi>
        </n-grid>
        </n-form>
        <div class="flex flex-row-reverse">
            <n-button type="info">Submit</n-button>
        </div>
    </n-layout>
</template>