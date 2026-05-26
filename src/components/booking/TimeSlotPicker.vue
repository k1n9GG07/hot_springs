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

const startHour = 8
const endHour = 21

const slots = computed(() => {
  const result = []
  for (let h = startHour; h <= endHour; h++) {
    const time = `${h.toString().padStart(2, '0')}:00`
    result.push({
      time,
      isBooked: checkIfBooked(time)
    })
  }
  return result
})

const checkIfBooked = (time) => {
  const [h] = time.split(':').map(Number)
  const slotStart = h
  const slotEnd = h + props.duration

  return props.bookedSlots.some(booked => {
    const [bhStart] = booked.timeStart.split(':').map(Number)
    const [bhEnd] = booked.timeEnd.split(':').map(Number)
    
    // Пересечение интервалов: [slotStart, slotEnd] и [bhStart, bhEnd]
    // Интервалы пересекаются, если max(slotStart, bhStart) < min(slotEnd, bhEnd)
    return Math.max(slotStart, bhStart) < Math.min(slotEnd, bhEnd)
  })
}

const selectSlot = (time) => {
  if (!checkIfBooked(time)) {
    emit('update:modelValue', time)
  }
}
</script>

<template>
  <div class="timeslot-picker">
    <label class="picker-label">Выберите время начала</label>
    <div class="slots-grid">
      <button 
        v-for="slot in slots" 
        :key="slot.time"
        type="button"
        class="slot-btn"
        :class="{ 
          active: modelValue === slot.time,
          booked: slot.isBooked 
        }"
        :disabled="slot.isBooked"
        @click="selectSlot(slot.time)"
      >
        {{ slot.time }}
      </button>
    </div>
    <p v-if="duration > 1" class="duration-hint">
      Бронирование будет на {{ duration }} ч. (до {{ parseInt(modelValue) + duration }}:00)
    </p>
  </div>
</template>

<style lang="scss" scoped>
.timeslot-picker {
  margin-bottom: 24px;

  .picker-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
    color: $text-color;
  }

  .slots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px;
  }

  .slot-btn {
    padding: 12px 5px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    font-family: $font-body;
    font-weight: 500;
    transition: all 0.3s ease;
    color: $text-color;

    &:hover:not(:disabled) {
      border-color: $success-color;
      color: $success-color;
    }

    &.active {
      background-color: $success-color;
      border-color: $success-color;
      color: white;
    }

    &.booked {
      background-color: #f0f0f0;
      color: #bbb;
      border-color: #eee;
      cursor: not-allowed;
    }
  }

  .duration-hint {
    margin-top: 10px;
    font-size: 13px;
    color: #666;
    font-style: italic;
  }
}
</style>
