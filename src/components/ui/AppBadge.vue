<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (val) => ['pending', 'confirmed', 'cancelled'].includes(val)
  }
})

const statusMap = {
  pending: { label: 'Ожидает', class: 'pending' },
  confirmed: { label: 'Подтверждено', class: 'confirmed' },
  cancelled: { label: 'Отменено', class: 'cancelled' }
}

const currentStatus = computed(() => statusMap[props.status])
</script>

<template>
  <span class="app-badge" :class="`app-badge--${currentStatus.class}`">
    {{ currentStatus.label }}
  </span>
</template>

<style lang="scss" scoped>
.app-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;

  &--pending {
    background-color: rgba($warning-color, 0.2);
    color: darken($warning-color, 20%);
  }

  &--confirmed {
    background-color: rgba($success-color, 0.2);
    color: darken($success-color, 10%);
  }

  &--cancelled {
    background-color: rgba($danger-color, 0.2);
    color: darken($danger-color, 10%);
  }
}
</style>
