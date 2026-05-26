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
    :class="[variant, { loading }]" 
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <span v-if="loading" class="spinner"></span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<style lang="scss" scoped>
.app-button {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  font-family: $font-body;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.primary {
    background-color: $primary-color;
    color: white;
    &:hover:not(:disabled) {
      background-color: darken($primary-color, 10%);
    }
  }

  &.outline {
    background-color: transparent;
    border: 2px solid $primary-color;
    color: $primary-color;
    &:hover:not(:disabled) {
      background-color: rgba($primary-color, 0.1);
    }
  }

  &.danger {
    background-color: $danger-color;
    color: white;
    &:hover:not(:disabled) {
      background-color: darken($danger-color, 10%);
    }
  }

  .spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s linear infinite;
  }

  &.outline .spinner {
    border-top-color: $primary-color;
    border-left-color: rgba($primary-color, 0.3);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
