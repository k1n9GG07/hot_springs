<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppToast from '@/components/ui/AppToast.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const toast = ref({ visible: false, message: '', type: 'error' })

const showToast = (message, type = 'error') => {
  toast.value = { visible: true, message, type }
  setTimeout(() => {
    toast.value.visible = false
  }, 3000)
}

const handleRegister = async () => {
  const { name, phone, email, password, confirmPassword } = form.value

  if (!name || !phone || !email || !password || !confirmPassword) {
    showToast('Заполните все поля')
    return
  }

  if (password !== confirmPassword) {
    showToast('Пароли не совпадают')
    return
  }

  loading.value = true
  const result = await authStore.register(name, phone, email, password)
  
  if (result.success) {
    router.push('/')
  } else {
    showToast(result.message)
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-view container section">
    <div class="auth-card">
      <h2>Регистрация</h2>
      <form @submit.prevent="handleRegister" class="auth-form">
        <AppInput label="Имя" v-model="form.name" placeholder="Иван Иванов" />
        <AppInput label="Телефон" v-model="form.phone" placeholder="+7 (___) ___-__-__" />
        <AppInput label="Email" type="email" v-model="form.email" placeholder="example@mail.ru" />
        <AppInput label="Пароль" type="password" v-model="form.password" placeholder="••••••••" />
        <AppInput label="Подтверждение пароля" type="password" v-model="form.confirmPassword" placeholder="••••••••" />
        
        <div class="auth-footer">
          <AppButton label="Зарегистрироваться" type="submit" :loading="loading" />
          <p>Уже есть аккаунт? <RouterLink to="/login">Войти</RouterLink></p>
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
  min-height: 80vh;
}

.auth-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;

  h2 {
    text-align: center;
    margin-bottom: 32px;
    color: $primary-color;
  }
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
