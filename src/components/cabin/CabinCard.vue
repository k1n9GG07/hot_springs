<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps({
  cabin: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const authStore = useAuthStore()

const handleBooking = () => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
  } else {
    router.push(`/booking/${props.cabin.id}`)
  }
}
</script>

<template>
  <div class="cabin-card">
    <div class="cabin-image">
      <img :src="cabin.image" :alt="cabin.name">
      <div class="capacity-badge">До {{ cabin.capacity }} чел.</div>
    </div>
    
    <div class="cabin-content">
      <h3 class="cabin-title">{{ cabin.name }}</h3>
      <p class="cabin-description">{{ cabin.description }}</p>
      
      <div class="cabin-footer">
        <div class="price-info">от 1 500 ₽ / час</div>
        <AppButton label="Забронировать" @click="handleBooking" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cabin-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .cabin-image {
    position: relative;
    height: 200px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .capacity-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(white, 0.9);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      color: $primary-color;
    }
  }

  .cabin-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;

    .cabin-title {
      font-family: $font-header;
      font-size: 20px;
      margin-bottom: 10px;
      color: $text-color;
    }

    .cabin-description {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      margin-bottom: 20px;
      flex: 1;
    }

    .cabin-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 1px solid #eee;

      .price-info {
        font-weight: 700;
        color: $primary-color;
        font-size: 16px;
      }
    }
  }
}
</style>
