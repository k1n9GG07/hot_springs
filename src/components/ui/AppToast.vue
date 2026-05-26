<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: 'success'
  },
  visible: Boolean
})
</script>

<template>
  <Transition name="toast">
    <div v-if="visible" class="app-toast" :class="`app-toast--${type}`">
      <div class="app-toast__icon">
        <span v-if="type === 'success'">✓</span>
        <span v-else>!</span>
      </div>
      <p class="app-toast__message">{{ message }}</p>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.app-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  color: white;
  min-width: 300px;

  &--success {
    background-color: $success-color;
  }

  &--error {
    background-color: $danger-color;
  }

  &__icon {
    font-size: 1.2rem;
    font-weight: bold;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    border-radius: 50%;
  }

  &__message {
    font-weight: 500;
  }
}

// Transitions
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
