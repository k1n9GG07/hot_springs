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
    router.push({ 
      name: 'login', 
      query: { redirect: route.fullPath } 
    })
  }
})
</script>

<template>
  <div class="booking-view container section">
    <h1 class="page-title">Бронирование кабинки</h1>
    <div class="booking-container">
      <BookingForm :cabin-id="route.params.cabinId" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: $primary-color;
  margin-bottom: 40px;
}

.booking-container {
  display: flex;
  justify-content: center;
}
</style>
