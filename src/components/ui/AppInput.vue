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
  <div class="app-input" :class="{ 'app-input--error': error }">
    <label v-if="label" class="app-input__label">{{ label }}</label>
    <input
      class="app-input__field"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="error" class="app-input__error-text">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &__label {
    font-size: 0.9rem;
    font-weight: 500;
    color: lighten($text-color, 20%);
  }

  &__field {
    padding: 12px 16px;
    border: 1px solid lighten($text-color, 60%);
    border-radius: 8px;
    font-family: $font-body;
    transition: all 0.3s ease;
    outline: none;

    &:focus {
      border-color: $primary-color;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
    }
  }

  &--error {
    .app-input__field {
      border-color: $danger-color;

      &:focus {
        box-shadow: 0 0 0 2px rgba($danger-color, 0.1);
      }
    }
  }

  &__error-text {
    font-size: 0.8rem;
    color: $danger-color;
  }
}
</style>
