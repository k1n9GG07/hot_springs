<script setup>
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'

defineProps({
  booking: {
    type: Object,
    required: true
  }
})

defineEmits(['cancel'])

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="booking-card" :class="booking.status">
    <div class="status-indicator"></div>
    
    <div class="booking-main">
      <div class="booking-info">
        <h4 class="cabin-name">{{ booking.cabinName }}</h4>
        <div class="booking-details">
          <span class="detail-item">📅 {{ formatDate(booking.date) }}</span>
          <span class="detail-item">⏰ {{ booking.timeStart }} – {{ booking.timeEnd }} ({{ booking.hours }} ч.)</span>
        </div>
      </div>

      <div class="booking-meta">
        <div class="booking-price">{{ booking.totalPrice.toLocaleString() }} ₽</div>
        <AppBadge :status="booking.status" />
      </div>

      <div v-if="booking.status === 'pending'" class="booking-actions">
        <AppButton label="Отменить" variant="danger" @click="$emit('cancel', booking.id)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.booking-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  overflow: hidden;
  margin-bottom: 16px;
  position: relative;

  .status-indicator {
    width: 6px;
    height: 100%;
    background-color: #ddd;
  }

  &.pending .status-indicator { background-color: $warning-color; }
  &.confirmed .status-indicator { background-color: $success-color; }
  &.cancelled .status-indicator { background-color: $danger-color; }

  .booking-main {
    flex: 1;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .booking-info {
    flex: 2;

    .cabin-name {
      font-family: $font-header;
      font-size: 18px;
      margin-bottom: 8px;
      color: $text-color;
    }

    .booking-details {
      display: flex;
      gap: 20px;
      font-size: 14px;
      color: #666;
    }
  }

  .booking-meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;

    .booking-price {
      font-weight: 700;
      font-size: 18px;
      color: $primary-color;
    }
  }

  .booking-actions {
    margin-left: 20px;
  }
}

@media (max-width: 768px) {
  .booking-main {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 15px !important;

    .booking-meta {
      align-items: flex-start;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
    }

    .booking-actions {
      margin-left: 0;
      width: 100%;
      
      button { width: 100%; }
    }
  }
}
</style>
