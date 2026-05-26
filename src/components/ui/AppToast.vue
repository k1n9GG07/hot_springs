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
    <div v-if="visible" class="app-toast" :class="type">
      {{ message }}
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.app-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  font-weight: 500;

  &.success {
    background-color: $success-color;
  }

  &.error {
    background-color: $danger-color;
  }
}

// Transitions
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
