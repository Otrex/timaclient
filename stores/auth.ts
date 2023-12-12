import { defineStore, acceptHMRUpdate } from 'pinia'

const api = useAPI();
export const useAuthStore = defineStore('auth', {
  state: () => ({
    h: "qwerty"
  }),

  getters: {
    isAuthenticated: (state) => !!state.h
  },

  actions: {
    login() {
      alert(api.login)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}