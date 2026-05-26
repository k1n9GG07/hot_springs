<script setup>
defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  label: String,
  error: String
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="app-input-wrapper">
    <label v-if="label" class="app-input-label">{{ label }}</label>
    <input 
      :type="type" 
      :value="modelValue" 
      :placeholder="placeholder"
      class="app-input"
      :class="{ 'has-error': error }"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.app-input-wrapper {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;

  .app-input-label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 6px;
    color: $text-color;
  }

  .app-input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: $font-body;
    font-size: 16px;
    transition: all 0.3s ease;
    outline: none;

    &:focus {
      border-bottom: 2px solid $primary-color;
    }

    &.has-error {
      border: 1px solid $danger-color;
    }
  }

  .error-message {
    font-size: 12px;
    color: $danger-color;
    margin-top: 4px;
  }
}
</style>
