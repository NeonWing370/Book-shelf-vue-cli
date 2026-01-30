<template>
  <div class="col-md-4 mx-auto">
    <h2 class="mb-3">Login</h2>

    <form @submit.prevent="submit">
      <input v-model="username" type="text" class="form-control mb-2" placeholder="Username" required />
      <input v-model="password" type="password" class="form-control mb-3" placeholder="Password" required />

      <button class="btn btn-primary w-100">Login</button>
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
    const ok = await auth.login(username.value, password.value)
    if (ok) router.push('/')
    else error.value = 'Невірний username або пароль'
  } catch (e) {
    error.value = 'Помилка при вході'
    console.error(e)
  }
}
</script>
