<template>
  <form @submit.prevent="submitBook" class="mb-4 book-form">
    <div class="mb-2">
      <input
        v-model="title"
        type="text"
        class="form-control"
        placeholder="Назва"
        required
      />
    </div>

    <div class="mb-2">
      <input
        v-model="author"
        type="text"
        class="form-control"
        placeholder="Автор"
        required
      />
    </div>

    <div class="mb-2">
      <input
        v-model="year"
        type="number"
        class="form-control"
        placeholder="Рік видання"
        required
      />
    </div>

    <div class="mb-2">
      <textarea
        v-model="description"
        class="form-control"
        placeholder="Опис"
        required
      ></textarea>
    </div>


    <button type="submit" class="btn btn-success">
       Додати книгу
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useBooksStore } from '@/stores/books'

const booksStore = useBooksStore()

const title = ref('')
const author = ref('')
const year = ref('')
const description = ref('')
const image = ref('')

const submitBook = async () => {
  await booksStore.addBook({
    title: title.value,
    author: author.value,
    year: year.value,
    description: description.value,
    image: image.value || null
  })

  title.value = ''
  author.value = ''
  year.value = ''
  description.value = ''
  image.value = ''
}
</script>
