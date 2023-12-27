<script setup lang="ts">
import type { Book } from '@prisma/client';
import { useNotification } from 'naive-ui';
import type { UploadFileInfo } from 'naive-ui';

// const book = ref(<Book>{
//     title: '',
//     author: '',
//     publisher: '',
//     price: 0,
//     stock: 0,
//     isbn: '',
//     cover: '',
//     description: '',
// })

const props = defineProps<{
    book: Book
}>()
const price = ref(0)

onMounted(() => {
    price.value = props.book.price / 100
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

const notification = useNotification();
const uploadCover = async ({
    file,
    event
}: {
    file: UploadFileInfo
    event?: ProgressEvent
}) => {
    const res = JSON.parse((event?.target as XMLHttpRequest).response);
    if (res.status === 200) {
        const url = res.data.url;
        props.book.cover = url;
    } else {
        notification.error({
            title: 'Error',
            description: 'Failed to upload book cover!'
        })
    }
}

const save = async () => {
    const book = JSON.parse(JSON.stringify(props.book));
    book.price = price.value * 100;

    if (!props.book.id) {
        const res = await $fetch('/api/book/add', {
            method: 'POST',
            body: {
                book: book
            }
        })

        if (res.status === 200) {
            notification.success({
                title: 'Success',
                description: 'Book added successfully!'
            })
            // @ts-ignore
            navigateTo(`/book/${res.data.id}`)
        } else {
            notification.error({
                title: 'Error',
                description: 'Failed to add book!'
            })
        }
    } else {
        const res = await $fetch(`/api/book/edit/${props.book.id}`, {
            method: 'POST',
            body: {
                book: book
            }
        })

        // @ts-ignore
        if (res.status === 200) {
            notification.success({
                title: 'Success',
                description: 'Book updated successfully!'
            })
            // @ts-ignore
            navigateTo(`/book/${res.data.id}`)
        } else {
            notification.error({
                title: 'Error',
                description: 'Failed to update book!'
            })
        }
    }
}
</script>


<template>
    <n-layout>
        <div class="text-2xl font-semibold">
            <div v-if="book.id">
                Edit Book
            </div>
            <div v-else>
                Add Book
            </div>
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
                <n-form-item-gi :span="8" label="ISBN" path="isbn">
                    <n-input v-model:value="book.isbn" clearable />
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="Price" path="price">
                    <n-input-number v-model:value="price" :precision="2" clearable placeholder="RMB" class="w-full">
                        <template #prefix>
                            ￥
                        </template>
                    </n-input-number>
                </n-form-item-gi>
                <n-form-item-gi :span="8" label="Stock" path="stock">
                    <n-input-number v-model:value="book.stock" clearable class="w-full" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="Description" path="description">
                    <n-input v-model:value="book.description" type="textarea" clearable />
                </n-form-item-gi>
                <n-form-item-gi :span="18" label="Cover" path="cover">
                    <n-input v-model:value="book.cover" clearable />
                </n-form-item-gi>
                <n-form-item-gi :span="6">
                    <n-upload abstract action="/api/upload" @finish="uploadCover">
                        <n-upload-trigger #="{ handleClick }" abstract>
                            <n-button type="info" @click="handleClick" class="w-full">Upload Book Cover</n-button>
                        </n-upload-trigger>
                        <n-upload-file-list class="hidden" />
                    </n-upload>
                </n-form-item-gi>
            </n-grid>
        </n-form>
        <div class="flex flex-row-reverse">
            <n-button type="info" @click="save">Submit</n-button>
        </div>
    </n-layout>
</template>