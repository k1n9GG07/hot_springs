<script setup>
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
</script>

<template>
  <div class="not-found">
    <div class="content">
      <h1 class="error-code">404</h1>
      <h2>Страница не найдена</h2>
      <p>К сожалению, запрашиваемая страница не существует или была перемещена.</p>
      <AppButton label="На главную" @click="router.push('/')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  min-height: calc(100vh - 300px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;

  .error-code {
    font-size: 120px;
    font-weight: 900;
    color: $primary-color;
    margin-bottom: 0;
    line-height: 1;
  }

  h2 {
    font-size: 32px;
    margin-bottom: 15px;
    color: $text-color;
  }

  p {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
    max-width: 500px;
  }
}
</style>
