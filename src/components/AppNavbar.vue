<template>
  <nav class="navbar navbar-dark bg-dark px-3">
    <router-link class="navbar-brand" to="/"> Book Shelf</router-link>

    <div v-if="auth.user">
      <span class="text-light me-3">{{ auth.user.username }}</span>
      <button class="btn btn-outline-light" @click="auth.logout">Logout</button>
    </div>

    <div v-else>
      <router-link class="btn btn-outline-light me-2" to="/login">Login</router-link>
      <router-link class="btn btn-outline-light" to="/register">Register</router-link>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>
