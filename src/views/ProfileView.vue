<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBookingsStore } from '@/stores/bookings'
import BookingCard from '@/components/booking/BookingCard.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const bookingsStore = useBookingsStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const handleCancel = async (id) => {
  if (confirm('Вы уверены, что хотите отменить бронирование?')) {
    await bookingsStore.cancelBooking(id)
    await bookingsStore.fetchUserBookings(authStore.currentUser.id)
  }
}

onMounted(async () => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }
  await bookingsStore.fetchUserBookings(authStore.currentUser.id)
})
</script>

<template>
  <div class="profile-view">
    <div class="profile-header">
      <div class="user-info">
        <h1>Личный кабинет</h1>
        <div class="user-details">
          <div class="detail"><strong>Имя:</strong> {{ authStore.currentUser?.name }}</div>
          <div class="detail"><strong>Телефон:</strong> {{ authStore.currentUser?.phone }}</div>
          <div class="detail"><strong>Email:</strong> {{ authStore.currentUser?.email }}</div>
        </div>
      </div>
      <AppButton label="Выйти из аккаунта" variant="outline" @click="handleLogout" />
    </div>

    <div class="bookings-section">
      <h2>Мои бронирования</h2>
      
      <div v-if="bookingsStore.userBookings.length" class="bookings-list">
        <BookingCard 
          v-for="booking in bookingsStore.userBookings" 
          :key="booking.id" 
          :booking="booking"
          @cancel="handleCancel"
        />
      </div>
      
      <div v-else class="empty-state">
        <div class="empty-icon">📅</div>
        <p>У вас пока нет активных бронирований</p>
        <AppButton label="Забронировать кабинку" @click="router.push('/cabins')" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-view {
  max-width: 900px;
  margin: 0 auto;

  .profile-header {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;

    h1 {
      font-size: 32px;
      color: $primary-color;
      margin-bottom: 20px;
    }

    .user-details {
      .detail {
        margin-bottom: 8px;
        font-size: 16px;
        strong { color: #666; width: 100px; display: inline-block; }
      }
    }
  }

  .bookings-section {
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
      color: $text-color;
    }

    .bookings-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);

      .empty-icon { font-size: 64px; margin-bottom: 20px; }
      p { font-size: 18px; color: #666; margin-bottom: 25px; }
    }
  }
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }
}
</style>
