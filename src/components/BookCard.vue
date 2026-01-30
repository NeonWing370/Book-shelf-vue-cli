<template>
  <div class="col-md-4 mb-3">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">{{ book.title }}</h5>

        <h6 class="card-subtitle mb-2 text-muted">
          {{ book.author }} ({{ book.year }})
        </h6>

        <p class="card-text">
          {{ book.description }}
        </p>

        <router-link
          :to="`/book/${book.id}`"
          class="btn btn-primary btn-sm me-2"
        >
          Деталі
        </router-link>

        <button
          class="btn btn-danger btn-sm"
          @click="confirmDelete"
        >
          Видалити
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useBooksStore } from '@/stores/books'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const booksStore = useBooksStore()

const confirmDelete = async () => {
  const ok = confirm(
    `Ви впевнені, що хочете видалити книгу "${props.book.title}"?`
  )
  if (!ok) return

  await booksStore.deleteBook(props.book.id)
}
</script>
