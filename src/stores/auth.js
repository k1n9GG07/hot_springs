import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUsers, createUser } from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)

  const isLoggedIn = computed(() => !!currentUser.value)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  const initAuth = () => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      currentUser.value = JSON.parse(user)
    }
  }

  const login = async (email, password) => {
    try {
      const { data: users } = await getUsers()
      const user = users.find(u => u.email === email && u.password === password)
      
      if (user) {
        currentUser.value = user
        localStorage.setItem('currentUser', JSON.stringify(user))
        return { success: true }
      }
      return { success: false, message: 'Неверный email или пароль' }
    } catch (error) {
      return { success: false, message: 'Ошибка при авторизации' }
    }
  }

  const register = async (name, phone, email, password) => {
    try {
      const { data: users } = await getUsers()
      if (users.find(u => u.email === email)) {
        return { success: false, message: 'Пользователь с таким email уже существует' }
      }

      const newUser = {
        name,
        phone,
        email,
        password,
        role: 'user'
      }

      const { data: user } = await createUser(newUser)
      currentUser.value = user
      localStorage.setItem('currentUser', JSON.stringify(user))
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Ошибка при регистрации' }
    }
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  return {
    currentUser,
    isLoggedIn,
    isAdmin,
    initAuth,
    login,
    register,
    logout
  }
})
