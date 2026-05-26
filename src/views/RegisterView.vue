<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  if (!name.value || !phone.value || !email.value || !password.value) {
    error.value = 'Пожалуйста, заполните все поля'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают'
    return
  }

  loading.value = true
  error.value = ''
  
  const result = await authStore.register(name.value, phone.value, email.value, password.value)
  
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.message
  }
  
  loading.value = false
}
</script>

<template>
  <div class="auth-view">
    <div class="auth-card">
      <h1>Регистрация</h1>
      <p class="subtitle">Создайте аккаунт, чтобы бронировать кабинки.</p>

      <form @submit.prevent="handleRegister">
        <AppInput v-model="name" label="Имя" placeholder="Иван Иванов" required />
        <AppInput v-model="phone" label="Телефон" placeholder="+7 (900) 000-00-00" required />
        <AppInput v-model="email" type="email" label="Email" placeholder="example@mail.ru" required />
        <AppInput v-model="password" type="password" label="Пароль" placeholder="••••••••" required />
        <AppInput v-model="confirmPassword" type="password" label="Подтвердите пароль" placeholder="••••••••" required />

        <div v-if="error" class="error-text">{{ error }}</div>

        <AppButton 
          label="Зарегистрироваться" 
          type="submit" 
          :loading="loading" 
          class="submit-btn" 
        />
      </form>

      <div class="auth-footer">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Используем те же стили, что и в LoginView
.auth-view {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  .auth-card {
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    width: 100%;
    max-width: 450px;

    h1 {
      font-family: $font-header;
      font-size: 32px;
      color: $primary-color;
      margin-bottom: 10px;
      text-align: center;
    }

    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 30px;
    }

    .error-text {
      color: $danger-color;
      font-size: 14px;
      margin-bottom: 20px;
      text-align: center;
    }

    .submit-btn {
      width: 100%;
      margin-top: 10px;
    }

    .auth-footer {
      margin-top: 25px;
      text-align: center;
      font-size: 14px;
      color: #666;

      a {
        color: $primary-color;
        font-weight: 600;
        &:hover { text-decoration: underline; }
      }
    }
  }
}
</style>
