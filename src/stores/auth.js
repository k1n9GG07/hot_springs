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
      } else {
        return { success: false, message: 'Неверный email или пароль' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Ошибка при входе' }
    }
  }

  const register = async (name, phone, email, password) => {
    try {
      const { data: users } = await getUsers()
      const existingUser = users.find(u => u.email === email)
      
      if (existingUser) {
        return { success: false, message: 'Пользователь с таким email уже существует' }
      }

      const newUser = {
        name,
        phone,
        email,
        password,
        role: 'user'
      }

      const { data: createdUser } = await createUser(newUser)
      currentUser.value = createdUser
      localStorage.setItem('currentUser', JSON.stringify(createdUser))
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
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
