<template>
  <div v-if="loading" class="text-muted">
    Завантаження...
  </div>

  <div v-else-if="notFound" class="text-danger">
    Книгу не знайдено
  </div>

  <div v-else class="card">
    <div class="card-body">
      <h3 class="card-title mb-3">Редагування книги</h3>

      <form @submit.prevent="save">
        <div class="mb-2">
          <input
            v-model="form.title"
            class="form-control"
            placeholder="Назва"
            required
          />
        </div>

        <div class="mb-2">
          <input
            v-model="form.author"
            class="form-control"
            placeholder="Автор"
            required
          />
        </div>

        <div class="mb-2">
          <input
            v-model="form.year"
            type="number"
            class="form-control"
            placeholder="Рік"
            required
          />
        </div>

        <div class="mb-2">
          <textarea
            v-model="form.description"
            class="form-control"
            placeholder="Опис"
            required
          />
        </div>

        <button class="btn btn-success me-2">
          Зберегти
        </button>

        <router-link to="/" class="btn btn-secondary">
          Назад
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/books'
import api from '@/services/axios'

const route = useRoute()
const router = useRouter()
const booksStore = useBooksStore()

const bookId = (route.params.id)

const loading = ref(true)
const notFound = ref(false)

const form = reactive({
  title: '',
  author: '',
  year: '',
  description: ''
})

onMounted(async () => {
  try {
    
    const res = await api.get(`/books/${bookId}`)

    Object.assign(form, res.data)
    loading.value = false
  } catch (err) {
    notFound.value = true
    loading.value = false
  }
})

const save = async () => {
  await booksStore.editBook(bookId, form)
  router.push('/')
}
</script>
