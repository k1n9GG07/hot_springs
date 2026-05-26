<script setup>
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
</script>

<template>
  <div class="not-found container section">
    <div class="not-found__content">
      <h1 class="not-found__title">404</h1>
      <p class="not-found__text">Упс! Страница, которую вы ищете, не существует или была перемещена.</p>
      <AppButton label="На главную" @click="router.push('/')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  text-align: center;

  &__title {
    font-size: 8rem;
    color: $primary-color;
    font-family: $font-header;
    line-height: 1;
    margin-bottom: 16px;
  }

  &__text {
    font-size: 1.2rem;
    color: lighten($text-color, 30%);
    margin-bottom: 32px;
    max-width: 400px;
  }
}
</style>
