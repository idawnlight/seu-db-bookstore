export const useAuthStore = defineStore('authStore', {
    state: () => ({
      loggedIn: false,
      userId: ''
    }),
    actions: {
      async fetch() {
        const session = await $fetch('/api/auth/session')
  
        if (session.body.userId) {
          this.userId = session.body.userId
          this.loggedIn = true
        }
      }
    }
  })