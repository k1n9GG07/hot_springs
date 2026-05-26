<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    
    <main class="app-main">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<style lang="scss">
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

// Global container class for consistency
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}
</style>
