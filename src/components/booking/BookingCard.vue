<script setup>
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps({
  booking: {
    type: Object,
    required: true
    /**
     * {
     *   id, cabinName, date, timeStart, timeEnd, 
     *   hours, totalPrice, status
     * }
     */
  }
})

defineEmits(['cancel', 'confirm'])

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}
</script>

<template>
  <div class="booking-card" :class="`booking-card--${booking.status}`">
    <div class="booking-card__info">
      <div class="booking-card__header">
        <h3 class="booking-card__cabin">{{ booking.cabinName }}</h3>
        <AppBadge :status="booking.status" />
      </div>
      
      <div class="booking-card__details">
        <div class="booking-card__item">
          <span class="booking-card__icon">📅</span>
          {{ formatDate(booking.date) }}
        </div>
        <div class="booking-card__item">
          <span class="booking-card__icon">🕒</span>
          {{ booking.timeStart }} — {{ booking.timeEnd }} ({{ booking.hours }} ч.)
        </div>
        <div class="booking-card__item">
          <span class="booking-card__icon">💰</span>
          <strong>{{ formatPrice(booking.totalPrice) }} ₽</strong>
        </div>
      </div>
    </div>

    <div class="booking-card__actions">
      <AppButton
        v-if="booking.status === 'pending'"
        label="Отменить"
        variant="danger"
        @click="$emit('cancel', booking.id)"
      />
      <!-- Слот для дополнительных действий админа, если нужно будет -->
      <slot name="admin-actions"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.booking-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-left: 6px solid #ccc;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(4px);
  }

  &--pending { border-left-color: $warning-color; }
  &--confirmed { border-left-color: $success-color; }
  &--cancelled { border-left-color: $danger-color; }

  &__info {
    flex: 1;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
  }

  &__cabin {
    margin: 0;
    font-size: 1.2rem;
    color: $primary-color;
  }

  &__details {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  &__item {
    font-size: 0.95rem;
    color: $text-color;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__icon {
    font-size: 1.1rem;
  }

  &__actions {
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    &__actions {
      margin-left: 0;
      width: 100%;
      
      .app-button {
        width: 100%;
      }
    }
  }
}
</style>
