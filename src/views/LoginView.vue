<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppToast from '@/components/ui/AppToast.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const toast = ref({ visible: false, message: '', type: 'error' })

const showToast = (message, type = 'error') => {
  toast.value = { visible: true, message, type }
  setTimeout(() => {
    toast.value.visible = false
  }, 3000)
}

const handleLogin = async () => {
  if (!email.value || !password.value) {
    showToast('Заполните все поля')
    return
  }

  loading.value = true
  const result = await authStore.login(email.value, password.value)
  
  if (result.success) {
    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath)
  } else {
    showToast(result.message)
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-view container section">
    <div class="auth-card">
      <h2>Вход в систему</h2>
      <form @submit.prevent="handleLogin" class="auth-form">
        <AppInput
          label="Email"
          type="email"
          v-model="email"
          placeholder="example@mail.ru"
        />
        <AppInput
          label="Пароль"
          type="password"
          v-model="password"
          placeholder="••••••••"
        />
        
        <div class="auth-footer">
          <AppButton label="Войти" type="submit" :loading="loading" />
          <p>Нет аккаунта? <RouterLink to="/register">Зарегистрироваться</RouterLink></p>
        </div>
      </form>
    </div>

    <AppToast
      :visible="toast.visible"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>

<style lang="scss" scoped>
.auth-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.auth-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;

  h2 {
    text-align: center;
    margin-bottom: 32px;
    color: $primary-color;
  }
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.auth-footer {
  margin-top: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .app-button {
    width: 100%;
  }

  p {
    font-size: 0.9rem;
    color: lighten($text-color, 30%);

    a {
      color: $primary-color;
      font-weight: 600;
      &:hover { text-decoration: underline; }
    }
  }
}
</style>
