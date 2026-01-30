import { defineStore } from 'pinia'
import api from '@/services/axios'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    loading: false,
  }),

  actions: {
    
    async fetchBooks() {
      this.loading = true
      try {
        const res = await api.get('/books')
        this.books = res.data
      } catch (err) {
        console.error('Fetch books error:', err)
      } finally {
        this.loading = false
      }
    },

    
    async addBook(book) {
      const res = await api.post('/books', book)

      
      this.books.push(res.data)
    },

    
    async editBook(id, book) {
      const updatedBook = {
        ...book,
        id
      }

      
      const res = await api.put(`/books/${id}`, updatedBook)

      
      const index = this.books.findIndex(b => b.id === id)
      if (index !== -1) {
        this.books[index] = res.data
      }
    },

    
    async deleteBook(id) {
      await api.delete(`/books/${id}`)

      
      this.books = this.books.filter(b => b.id !== id)
    }
  }
})
