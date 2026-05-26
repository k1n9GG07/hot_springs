<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps({
  cabin: {
    type: Object,
    required: true,
    // { id, name, capacity, description, image }
  }
})

const router = useRouter()
const authStore = useAuthStore()

const handleBooking = () => {
  if (!authStore.isLoggedIn) {
    router.push({ name: 'login' })
  } else {
    router.push({ name: 'booking', params: { cabinId: props.cabin.id } })
  }
}
</script>

<template>
  <div class="cabin-card">
    <div class="cabin-card__image">
      <img :src="cabin.image" :alt="cabin.name">
      <div class="cabin-card__capacity">
        👥 До {{ cabin.capacity }} чел.
      </div>
    </div>
    
    <div class="cabin-card__content">
      <h3 class="cabin-card__title">{{ cabin.name }}</h3>
      <p class="cabin-card__description">{{ cabin.description }}</p>
      
      <div class="cabin-card__footer">
        <div class="cabin-card__price-info">
          от <span>1 500 ₽</span> / час
        </div>
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  &__image {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  &__capacity {
    position: absolute;
    bottom: 12px;
    right: 12px;
    background: rgba(white, 0.9);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    color: $primary-color;
  }

  &__content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__title {
    margin-bottom: 12px;
    color: $text-color;
    font-size: 1.4rem;
  }

  &__description {
    color: lighten($text-color, 25%);
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 24px;
    flex: 1;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
  }

  &__price-info {
    font-size: 0.9rem;
    color: lighten($text-color, 20%);

    span {
      font-weight: 700;
      color: $primary-color;
      font-size: 1.1rem;
    }
  }
}
</style>
