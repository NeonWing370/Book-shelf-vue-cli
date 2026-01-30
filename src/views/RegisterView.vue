<template>
  <div class="col-md-4 mx-auto">
    <h2 class="mb-3">Register</h2>

    <form @submit.prevent="submit">
      <input v-model="username" type="text" class="form-control mb-2" placeholder="Username (мін. 3 символи)" required />
      <input v-model="password" type="password" class="form-control mb-3" placeholder="Password (мін. 8 символів)" required />

      <button class="btn btn-success w-100">Register</button>
    </form>

    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref(null)

const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  try {
    if (username.value.length < 3) {
      error.value = 'Username має бути мінімум 3 символи'
      return
    }
    if (password.value.length < 8) {
      error.value = 'Password має бути мінімум 8 символів'
      return
    }

    const ok = await auth.register(username.value, password.value)
    if (ok) router.push('/')
    else error.value = 'Такий username вже існує'
  } catch (e) {
    error.value = 'Помилка при реєстрації'
    console.error(e)
  }
}
</script>
