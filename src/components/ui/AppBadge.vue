<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['pending', 'confirmed', 'cancelled'].includes(value)
  }
})

const statusMap = {
  pending: { text: 'Ожидает', class: 'warning' },
  confirmed: { text: 'Подтверждено', class: 'success' },
  cancelled: { text: 'Отменено', class: 'danger' }
}

const statusInfo = computed(() => statusMap[props.status])
</script>

<template>
  <span class="app-badge" :class="statusInfo.class">
    {{ statusInfo.text }}
  </span>
</template>

<style lang="scss" scoped>
.app-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;

  &.warning {
    background-color: lighten($warning-color, 35%);
    color: darken($warning-color, 20%);
  }

  &.success {
    background-color: lighten($success-color, 35%);
    color: darken($success-color, 10%);
  }

  &.danger {
    background-color: lighten($danger-color, 35%);
    color: darken($danger-color, 10%);
  }
}
</style>
