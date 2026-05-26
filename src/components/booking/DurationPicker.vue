<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const options = [1, 2, 3, 4]

const totalPrice = computed(() => {
  return props.modelValue === 1 ? 2000 : props.modelValue * 1500
})

const selectDuration = (hours) => {
  emit('update:modelValue', hours)
}
</script>

<template>
  <div class="duration-picker">
    <label class="picker-label">Длительность отдыха</label>
    <div class="options-grid">
      <button 
        v-for="hours in options" 
        :key="hours"
        type="button"
        class="duration-btn"
        :class="{ active: modelValue === hours }"
        @click="selectDuration(hours)"
      >
        {{ hours }} {{ hours === 1 ? 'час' : 'часа' }}
      </button>
    </div>
    
    <div class="price-display">
      Итоговая стоимость: <span>{{ totalPrice.toLocaleString() }} ₽</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.duration-picker {
  margin-bottom: 24px;

  .picker-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
    color: $text-color;
  }

  .options-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 15px;
  }

  .duration-btn {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    font-family: $font-body;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }

    &.active {
      background-color: $primary-color;
      border-color: $primary-color;
      color: white;
    }
  }

  .price-display {
    font-size: 16px;
    color: #666;
    
    span {
      font-weight: 700;
      color: $primary-color;
      font-size: 18px;
    }
  }
}
</style>
