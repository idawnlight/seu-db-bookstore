<script setup lang="ts">
// const { data } = await useFetch('/api/echo')
import type { Book, User, Comment } from "@prisma/client";
import BookItem from "~/components/BookItem.vue";

const testBook = ref(<Book>{
  title: "Database System Concepts",
  author: "Abraham Silberschatz (Author), Henry Korth (Author)",
  price: 10000,
  publisher: "McGraw Hill",
  isbn: "9781260084504",
  cover: "https://codex.cs.yale.edu/avi/db-book/images/db7-cover.jpg",
  description:
    "ISBN: 9781260084504 is an International Student Edition of Database System Concepts 7th Edition by Abraham Silberschatz, Henry F. Korth, S. Sudarshan This ISBN 9781260084504 is Textbook only. It will not come with online access code. Online Access code (should only be purchased when required by an instructor ) sold separately at other ISBN. The content of of this title on all formats are the same. Database System Concepts by Silberschatz, Korth and Sudarshan is now in its 7th edition and is one of the cornerstone texts of database education. It presents the fundamental concepts of database management in an intuitive manner geared toward allowing students to begin working with databases as quickly as possible. The text is designed for a first course in databases at the junior/senior undergraduate level or the first year graduate level. It also contains additional material that can be used as supplements or as introductory material for an advanced course. Because the authors present concepts as intuitive descriptions, a familiarity with basic data structures, computer organization, and a high-level programming language are the only prerequisites. Important theoretical results are covered, but formal proofs are omitted. In place of proofs, figures and examples are used to suggest why a result is true.",
});

const testUser = ref(<User>{
    avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    username: "Test User",
})

const testComment = ref(<Comment & {
  user: User
}>{
    user: testUser.value,
    content: "This textbook is getting me through my databases study unit at University, without it I’d be lost. The book is well organised and the explanations are clear with many examples and diagrams. The shipping time was incredible.",
    createdAt: new Date('2023-09-06 05:30:00')
})
</script>

<template>
  <!-- <pre>{{ data }}</pre> -->
  <!-- <h1 class="text-3xl font-bold underline">
        Hello world!
    </h1> -->
  <n-button>hello</n-button>
  <book-details :book="testBook"></book-details>
  <div class="text-2xl">Comments</div>
  <div class="h-4"></div>
  <make-comment :comment="testComment"></make-comment>
  <n-divider/>
  <comment :comment="testComment"></comment>

  <!-- <book-item title="Database System Concepts" author="Abraham Silberschatz, Henry Korth, et al." price-head="105" price-tail="61"></book-item> -->
</template>
