<script setup lang="ts">
import type { Book } from '@prisma/client';

const book = ref(<Book>{
    title: "",
    author: "",
    price: 10000,
    publisher: "",
    isbn: "",
    cover: "",
    stock: 1,
    description: "",
});

</script>

<template>
    <div v-if="book">
        <edit-book :book="book"></edit-book>
    </div>
</template>