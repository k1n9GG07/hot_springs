<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBookingsStore } from '@/stores/bookings'
import BookingCard from '@/components/booking/BookingCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppToast from '@/components/ui/AppToast.vue'

const router = useRouter()
const authStore = useAuthStore()
const bookingsStore = useBookingsStore()

const toast = ref({ visible: false, message: '', type: 'success' })

const showToast = (message, type = 'success') => {
  toast.value = { visible: true, message, type }
  setTimeout(() => {
    toast.value.visible = false
  }, 3000)
}

onMounted(async () => {
  if (authStore.currentUser) {
    await bookingsStore.fetchUserBookings(authStore.currentUser.id)
  }
})

const handleCancel = async (id) => {
  if (confirm('Вы уверены, что хотите отменить бронирование?')) {
    const result = await bookingsStore.cancelBooking(id)
    if (result.success) {
      showToast('Бронирование отменено')
    } else {
      showToast(result.message, 'error')
    }
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="profile-view container section" v-if="authStore.currentUser">
    <div class="profile-header">
      <div class="user-info">
        <h1>Личный кабинет</h1>
        <p class="user-info__name">{{ authStore.currentUser.name }}</p>
        <p class="user-info__phone">📞 {{ authStore.currentUser.phone }}</p>
      </div>
      <AppButton label="Выйти" variant="outline" @click="handleLogout" />
    </div>

    <div class="bookings-section">
      <h2 class="section-title">Мои бронирования</h2>
      
      <div v-if="bookingsStore.userBookings.length > 0" class="bookings-list">
        <BookingCard 
          v-for="booking in bookingsStore.userBookings" 
          :key="booking.id" 
          :booking="booking"
          @cancel="handleCancel"
        />
      </div>
      
      <div v-else class="empty-state">
        <div class="empty-state__icon">📭</div>
        <h3>У вас пока нет бронирований</h3>
        <p>Выберите подходящую кабинку и насладитесь отдыхом!</p>
        <AppButton label="К выбору кабинок" @click="router.push('/cabins')" />
      </div>
    </div>

    <AppToast
      :visible="toast.visible"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>

<style lang="scss" scoped>
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  margin-bottom: 60px;

  h1 {
    font-size: 1.5rem;
    color: lighten($text-color, 30%);
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .user-info {
    &__name {
      font-size: 2rem;
      font-family: $font-header;
      font-weight: 700;
      color: $primary-color;
      margin-bottom: 8px;
    }

    &__phone {
      font-size: 1.1rem;
      color: lighten($text-color, 20%);
    }
  }
}

.section-title {
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 20px;
  
  &__icon {
    font-size: 4rem;
    margin-bottom: 20px;
  }

  h3 {
    margin-bottom: 12px;
  }

  p {
    color: lighten($text-color, 30%);
    margin-bottom: 32px;
  }
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    gap: 24px;
    align-items: center;
    text-align: center;
  }
}
</style>
