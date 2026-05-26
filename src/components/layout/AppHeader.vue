<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/ui/AppButton.vue'

const authStore = useAuthStore()
const router = useRouter()
const isMenuOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="app-header">
    <div class="container">
      <router-link to="/" class="logo">Горячие источники</router-link>

      <button class="burger" @click="toggleMenu" :class="{ active: isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="nav" :class="{ open: isMenuOpen }">
        <div class="nav-links">
          <router-link to="/" @click="isMenuOpen = false">Главная</router-link>
          <router-link to="/cabins" @click="isMenuOpen = false">Кабинки</router-link>
          <router-link v-if="authStore.isAdmin" to="/admin" @click="isMenuOpen = false">Админ-панель</router-link>
        </div>

        <div class="auth-actions">
          <template v-if="authStore.isLoggedIn">
            <span class="user-name">{{ authStore.currentUser?.name }}</span>
            <router-link to="/profile" @click="isMenuOpen = false">Личный кабинет</router-link>
            <AppButton label="Выйти" variant="outline" @click="handleLogout" />
          </template>
          <template v-else>
            <AppButton label="Войти" variant="outline" @click="router.push('/login'); isMenuOpen = false" />
            <AppButton label="Регистрация" @click="router.push('/register'); isMenuOpen = false" />
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-family: $font-header;
    font-size: 24px;
    font-weight: 700;
    color: $primary-color;
    text-decoration: none;
  }

  .burger {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;

    span {
      display: block;
      width: 25px;
      height: 3px;
      background-color: $primary-color;
      transition: 0.3s;
    }

    &.active {
      span:nth-child(1) { transform: rotate(45deg) translate(6px, 6px); }
      span:nth-child(2) { opacity: 0; }
      span:nth-child(3) { transform: rotate(-45deg) translate(6px, -7px); }
    }
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 40px;

    .nav-links {
      display: flex;
      gap: 20px;
      
      a {
        font-weight: 500;
        color: $text-color;
        transition: color 0.3s;
        &.router-link-active { color: $primary-color; }
        &:hover { color: $primary-color; }
      }
    }

    .auth-actions {
      display: flex;
      align-items: center;
      gap: 15px;

      .user-name {
        font-weight: 600;
        margin-right: 10px;
      }
    }
  }
}

@media (max-width: 768px) {
  .app-header {
    .burger { display: flex; }

    .nav {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: white;
      flex-direction: column;
      padding: 20px;
      gap: 20px;
      transform: translateY(-150%);
      transition: 0.4s;
      box-shadow: 0 5px 10px rgba(0,0,0,0.1);

      &.open { transform: translateY(0); }

      .nav-links, .auth-actions {
        flex-direction: column;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
