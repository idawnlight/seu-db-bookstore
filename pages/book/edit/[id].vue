<script setup>
import { computed } from 'vue';

const route = useRoute()

const res = useFetch(`/api/book/get/${route.params.id}`).data
const book = computed(() => res.value?.data)

</script>

<template>
    <div v-if="book">
        <edit-book :book="book"></edit-book>
    </div>
</template>