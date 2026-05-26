<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BookingForm from '@/components/booking/BookingForm.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
  }
})
</script>

<template>
  <div class="booking-view">
    <div class="page-header">
      <h1>Бронирование кабинки</h1>
      <p>Заполните форму ниже, чтобы забронировать ваш отдых</p>
    </div>

    <div class="form-wrapper">
      <BookingForm :cabin-id="route.params.cabinId" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.booking-view {
  max-width: 800px;
  margin: 0 auto;

  .page-header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
      font-size: 36px;
      color: $primary-color;
      margin-bottom: 10px;
    }

    p {
      color: #666;
    }
  }

  .form-wrapper {
    margin-bottom: 60px;
  }
}
</style>
