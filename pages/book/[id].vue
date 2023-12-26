<script setup>
import { computed } from 'vue';

const route = useRoute()
const auth = useAuthStore()

const res = useFetch(`/api/book/get/${route.params.id}`).data
const book = computed(() => res.value?.data)

const comments = useFetch(`/api/comments/get/${route.params.id}`)
const commentList = computed(() => comments.data.value?.data.sort((a, b) => b.id - a.id))

const postComment = async (comment) => {
    await useFetch('/api/comments/new', {
        method: 'POST',
        body: JSON.stringify({
            bookId: book.value.id,
            comment
        })
    })
    comments.refresh()
}
</script>

<template>
    <div v-if="book">
    <book-details :book="book"></book-details>
    <div class="text-2xl">Comments</div>
    <make-comment class="pt-4" :user="auth.info" @addComment="postComment"></make-comment>
    <n-divider/>
    <comment v-for="comment in commentList" :comment="comment" class="pt-4"></comment>
</div>
</template>