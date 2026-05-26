<script setup>
defineProps({
  isOpen: Boolean,
  title: String
})

defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="app-modal-overlay" @click.self="$emit('close')">
        <div class="app-modal">
          <header class="app-modal__header">
            <h3>{{ title }}</h3>
            <button class="app-modal__close" @click="$emit('close')">&times;</button>
          </header>
          <div class="app-modal__content">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.app-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.app-modal {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;

  &__header {
    padding: 20px 24px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      color: $primary-color;
    }
  }

  &__close {
    font-size: 2rem;
    line-height: 1;
    color: lighten($text-color, 40%);
    transition: color 0.3s;

    &:hover {
      color: $danger-color;
    }
  }

  &__content {
    padding: 24px;
  }
}

// Transitions
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
  
  .app-modal {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .app-modal {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
