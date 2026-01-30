import { defineStore } from 'pinia'
import api from '@/services/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null
  }),
  actions: {
    async login(username, password) {
      try {
        const res = await api.get(`/users?username=${username}&password=${password}`)
        if (res.data.length) {
          this.user = res.data[0]
          localStorage.setItem('user', JSON.stringify(this.user))
          return true
        } else {
          return false
        }
      } catch (err) {
        console.error(err)
        return false
      }
    },
    logout() {
      if (confirm('Точно вийти?')) {
        this.user = null
        localStorage.removeItem('user')
      }
    },
    async register(username, password) {
      try {
        const existing = await api.get(`/users?username=${username}`)
        if (existing.data.length) return false

        const res = await api.post('/users', { username, password })
        this.user = res.data
        localStorage.setItem('user', JSON.stringify(this.user))
        return true
      } catch (err) {
        console.error(err)
        return false
      }
    }
  }
})
