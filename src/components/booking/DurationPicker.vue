<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const durations = [1, 2, 3, 4]

const totalPrice = computed(() => {
  return props.modelValue === 1 ? 2000 : props.modelValue * 1500
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}
</script>

<template>
  <div class="duration-picker">
    <label class="duration-picker__label">Длительность отдыха</label>
    <div class="duration-picker__options">
      <button
        v-for="h in durations"
        :key="h"
        type="button"
        class="duration-picker__btn"
        :class="{ 'is-active': modelValue === h }"
        @click="emit('update:modelValue', h)"
      >
        {{ h }} {{ h === 1 ? 'час' : 'часа' }}
      </button>
    </div>
    
    <div class="duration-picker__price">
      Итоговая стоимость: <span>{{ formatPrice(totalPrice) }} ₽</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.duration-picker {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__label {
    font-size: 0.9rem;
    font-weight: 500;
    color: lighten($text-color, 20%);
  }

  &__options {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__btn {
    flex: 1;
    min-width: 80px;
    padding: 10px;
    border: 1px solid lighten($text-color, 60%);
    border-radius: 8px;
    background: white;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }

    &.is-active {
      background-color: $primary-color;
      border-color: $primary-color;
      color: white;
    }
  }

  &__price {
    margin-top: 8px;
    font-size: 1rem;
    color: $text-color;

    span {
      font-weight: 700;
      color: $primary-color;
      font-size: 1.2rem;
    }
  }
}
</style>
