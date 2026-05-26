<script setup>
import { onMounted } from 'vue'
import { useCabinsStore } from '@/stores/cabins'
import CabinCard from '@/components/cabin/CabinCard.vue'

const cabinsStore = useCabinsStore()

onMounted(async () => {
  if (cabinsStore.cabins.length === 0) {
    await cabinsStore.fetchCabins()
  }
})
</script>

<template>
  <div class="cabins-view container section">
    <h1 class="page-title">Наши кабинки</h1>
    <p class="page-subtitle">Выберите идеальную кабинку для вашего отдыха</p>
    
    <div class="cabins-grid">
      <CabinCard 
        v-for="cabin in cabinsStore.cabins" 
        :key="cabin.id" 
        :cabin="cabin" 
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: $primary-color;
  margin-bottom: 8px;
}

.page-subtitle {
  text-align: center;
  color: lighten($text-color, 30%);
  margin-bottom: 50px;
}

.cabins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .cabins-grid {
    grid-template-columns: 1fr;
  }
}
</style>
