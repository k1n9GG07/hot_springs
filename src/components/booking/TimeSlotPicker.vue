<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  bookedSlots: {
    type: Array,
    default: () => []
  },
  duration: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:modelValue'])

const allSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', 
  '20:00', '21:00'
]

// Преобразование "HH:MM" в минуты для сравнения
const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const isSlotBooked = (slot) => {
  const start = timeToMinutes(slot)
  const end = start + props.duration * 60

  // Проверка выхода за пределы рабочего времени (до 22:00)
  if (end > timeToMinutes('22:00')) return true

  return props.bookedSlots.some(booked => {
    const bStart = timeToMinutes(booked.timeStart)
    const bEnd = timeToMinutes(booked.timeEnd)
    
    // Пересечение интервалов: [start, end] и [bStart, bEnd]
    // Пересекаются если start < bEnd И end > bStart
    return start < bEnd && end > bStart
  })
}

const selectSlot = (slot) => {
  if (!isSlotBooked(slot)) {
    emit('update:modelValue', slot)
  }
}
</script>

<template>
  <div class="time-slot-picker">
    <label class="time-slot-picker__label">Выберите время начала</label>
    <div class="time-slot-picker__grid">
      <button
        v-for="slot in allSlots"
        :key="slot"
        type="button"
        class="time-slot-picker__btn"
        :class="{ 
          'is-active': modelValue === slot,
          'is-booked': isSlotBooked(slot)
        }"
        :disabled="isSlotBooked(slot)"
        @click="selectSlot(slot)"
      >
        {{ slot }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.time-slot-picker {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__label {
    font-size: 0.9rem;
    font-weight: 500;
    color: lighten($text-color, 20%);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px;
  }

  &__btn {
    padding: 10px;
    border: 1px solid $success-color;
    border-radius: 8px;
    background: rgba($success-color, 0.05);
    color: $success-color;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: $success-color;
      color: white;
    }

    &.is-active {
      background: $primary-color;
      border-color: $primary-color;
      color: white;
    }

    &.is-booked {
      background: #f0f0f0;
      border-color: #ddd;
      color: #aaa;
      cursor: not-allowed;
      text-decoration: line-through;
    }
  }
}
</style>
