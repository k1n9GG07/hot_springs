<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'outline', 'danger'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<template>
  <button
    class="app-button"
    :class="[`app-button--${variant}`, { 'app-button--loading': loading }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="app-button__spinner"></span>
    <span v-else class="app-button__label">{{ label }}</span>
  </button>
</template>

<style lang="scss" scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-family: $font-body;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  min-width: 120px;
  position: relative;

  &--primary {
    background-color: $primary-color;
    color: white;

    &:hover:not(:disabled) {
      background-color: darken($primary-color, 10%);
      transform: translateY(-2px);
    }
  }

  &--outline {
    background-color: transparent;
    border-color: $primary-color;
    color: $primary-color;

    &:hover:not(:disabled) {
      background-color: rgba($primary-color, 0.1);
      transform: translateY(-2px);
    }
  }

  &--danger {
    background-color: $danger-color;
    color: white;

    &:hover:not(:disabled) {
      background-color: darken($danger-color, 10%);
      transform: translateY(-2px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &__spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(white, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
}
</style>
