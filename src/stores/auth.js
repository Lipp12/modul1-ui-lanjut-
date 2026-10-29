import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'gatherly-auth-user'

export const useAuthStore = defineStore('auth', () => {
  const readStoredUser = () => {
    if (typeof window === 'undefined') return null

    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY)
      return rawValue ? JSON.parse(rawValue) : null
    } catch {
      return null
    }
  }

  const user = ref(readStoredUser())

  const isAuthenticated = computed(() => Boolean(user.value))

  const persistUser = (nextUser) => {
    if (typeof window !== 'undefined') {
      if (nextUser) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  const login = ({ email, password, name }) => {
    if (!email || !password) {
      throw new Error('Email and password are required.')
    }

    const nextUser = {
      name: name || email.split('@')[0],
      email,
      role: 'member'
    }

    user.value = nextUser
    persistUser(nextUser)

    return nextUser
  }

  const register = ({ name, email, password }) => {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required.')
    }

    const nextUser = {
      name,
      email,
      role: 'member'
    }

    user.value = nextUser
    persistUser(nextUser)

    return nextUser
  }

  const logout = () => {
    user.value = null
    persistUser(null)
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout
  }
})
