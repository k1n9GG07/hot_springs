<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'home' })
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="container app-header__content">
      <RouterLink to="/" class="app-header__logo" @click="closeMenu">
        Горячие источники
      </RouterLink>

      <button class="app-header__burger" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="app-header__nav" :class="{ 'is-open': isMenuOpen }">
        <div class="app-header__links">
          <RouterLink to="/" class="app-header__link" @click="closeMenu">Главная</RouterLink>
          <RouterLink to="/cabins" class="app-header__link" @click="closeMenu">Кабинки</RouterLink>
          <RouterLink v-if="authStore.isAdmin" to="/admin" class="app-header__link" @click="closeMenu">Админ-панель</RouterLink>
        </div>

        <div class="app-header__auth">
          <template v-if="authStore.isLoggedIn">
            <div class="app-header__user-info">
              <span class="app-header__username">{{ authStore.currentUser.name }}</span>
              <RouterLink to="/profile" class="app-header__link" @click="closeMenu">Личный кабинет</RouterLink>
            </div>
            <AppButton label="Выйти" variant="outline" @click="handleLogout" />
          </template>
          <template v-else>
            <RouterLink to="/login" class="app-header__link" @click="closeMenu">Войти</RouterLink>
            <AppButton label="Регистрация" @click="router.push('/register'); closeMenu()" />
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  height: 80px;
  display: flex;
  align-items: center;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    font-family: $font-header;
    font-size: 1.8rem;
    font-weight: 700;
    color: $primary-color;
    text-decoration: none;
  }

  &__burger {
    display: none;
    flex-direction: column;
    gap: 6px;
    
    span {
      width: 30px;
      height: 3px;
      background: $primary-color;
      transition: 0.3s;
    }

    &.is-active {
      span:nth-child(1) { transform: rotate(45deg) translate(6px, 6px); }
      span:nth-child(2) { opacity: 0; }
      span:nth-child(3) { transform: rotate(-45deg) translate(7px, -7px); }
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 40px;
    flex: 1;
    justify-content: space-between;
    margin-left: 60px;
  }

  &__links {
    display: flex;
    gap: 24px;
  }

  &__auth {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__username {
    font-weight: 600;
    font-size: 0.9rem;
    color: $primary-color;
  }

  &__link {
    font-weight: 500;
    color: $text-color;
    transition: color 0.3s;
    text-decoration: none;

    &:hover, &.router-link-active {
      color: $primary-color;
    }
  }

  @media (max-width: 992px) {
    &__burger {
      display: flex;
    }

    &__nav {
      position: fixed;
      top: 80px;
      left: 0;
      width: 100%;
      height: calc(100vh - 80px);
      background: white;
      flex-direction: column;
      justify-content: flex-start;
      padding: 40px 20px;
      margin: 0;
      transform: translateX(100%);
      transition: transform 0.3s ease;

      &.is-open {
        transform: translateX(0);
      }
    }

    &__links {
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 40px;
    }

    &__auth {
      flex-direction: column;
      width: 100%;
    }

    &__user-info {
      align-items: center;
      margin-bottom: 20px;
    }
  }
}
</style>
