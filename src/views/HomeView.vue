<template>
  <div class="container mt-4">
    <h1 class="mb-3">Книжкова полиця</h1>
    <BookForm @book-added="fetchBooks"/>
    <transition-group name="book" tag="div" class="row">
      <BookCard
        v-for="book in booksStore.books"
        :key="book.id"
        :book="book"
        @deleted="fetchBooks"
      />
    </transition-group>
  </div>
  
</template>

<style scoped>
.book-card {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: all 0.4s ease;
}

.book-new {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}
</style>

<script setup>

import { onMounted } from 'vue'
import { useBooksStore } from '@/stores/books'
import BookCard from '@/components/BookCard.vue'
import BookForm from '@/components/BookForm.vue'

const booksStore = useBooksStore()

const fetchBooks = async () => {
  await booksStore.fetchBooks()
}

onMounted(fetchBooks)
</script>
