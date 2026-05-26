<script setup>
import { onMounted } from 'vue'
import { useCabinsStore } from '@/stores/cabins'
import CabinCard from '@/components/cabin/CabinCard.vue'

const cabinsStore = useCabinsStore()

onMounted(async () => {
  await cabinsStore.fetchCabins()
})
</script>

<template>
  <div class="cabins-view">
    <div class="page-header">
      <h1>Наши уютные кабинки</h1>
      <p>Выберите подходящую кабинку для вашего отдыха</p>
    </div>

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
.cabins-view {
  .page-header {
    text-align: center;
    margin-bottom: 50px;
    
    h1 {
      font-size: 42px;
      color: $primary-color;
      margin-bottom: 15px;
    }
    
    p {
      font-size: 18px;
      color: #666;
    }
  }

  .cabins-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
  }
}
</style>
