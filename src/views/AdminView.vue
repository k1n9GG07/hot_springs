<script setup>
import { onMounted, ref, computed } from 'vue'
import { useBookingsStore } from '@/stores/bookings'
import { useCabinsStore } from '@/stores/cabins'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppToast from '@/components/ui/AppToast.vue'

const bookingsStore = useBookingsStore()
const cabinsStore = useCabinsStore()

const filterCabin = ref('')
const filterDate = ref('')
const toast = ref({ visible: false, message: '', type: 'success' })

const showToast = (message, type = 'success') => {
  toast.value = { visible: true, message, type }
  setTimeout(() => {
    toast.value.visible = false
  }, 3000)
}

onMounted(async () => {
  await bookingsStore.fetchAllBookings()
  if (cabinsStore.cabins.length === 0) {
    await cabinsStore.fetchCabins()
  }
})

const filteredBookings = computed(() => {
  return bookingsStore.allBookings.filter(b => {
    const matchCabin = !filterCabin.value || b.cabinId === Number(filterCabin.value)
    const matchDate = !filterDate.value || b.date === filterDate.value
    return matchCabin && matchDate
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

const stats = computed(() => {
  const all = bookingsStore.allBookings
  return {
    total: all.length,
    pending: all.filter(b => b.status === 'pending').length,
    confirmed: all.filter(b => b.status === 'confirmed').length
  }
})

const handleConfirm = async (id) => {
  const result = await bookingsStore.confirmBooking(id)
  if (result.success) showToast('Бронирование подтверждено')
}

const handleCancel = async (id) => {
  if (confirm('Отменить это бронирование?')) {
    const result = await bookingsStore.cancelBooking(id)
    if (result.success) showToast('Бронирование отменено')
  }
}

const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price)
</script>

<template>
  <div class="admin-view container section">
    <h1 class="page-title">Панель администратора</h1>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-card__value">{{ stats.total }}</div>
        <div class="stat-card__label">Всего броней</div>
      </div>
      <div class="stat-card stat-card--pending">
        <div class="stat-card__value">{{ stats.pending }}</div>
        <div class="stat-card__label">Ожидают</div>
      </div>
      <div class="stat-card stat-card--confirmed">
        <div class="stat-card__value">{{ stats.confirmed }}</div>
        <div class="stat-card__label">Подтверждено</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <div class="filter-item">
        <label>Кабинка</label>
        <select v-model="filterCabin" class="admin-select">
          <option value="">Все кабинки</option>
          <option v-for="c in cabinsStore.cabins" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>
      <div class="filter-item">
        <AppInput label="Дата" type="date" v-model="filterDate" />
      </div>
      <AppButton label="Сбросить" variant="outline" @click="filterCabin = ''; filterDate = ''" />
    </div>

    <!-- Table -->
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Кабинка</th>
            <th>Дата и время</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in filteredBookings" :key="b.id">
            <td>
              <div class="client-info">
                <strong>{{ b.userName }}</strong>
                <span>{{ b.userPhone }}</span>
              </div>
            </td>
            <td>{{ b.cabinName }}</td>
            <td>
              <div class="time-info">
                <strong>{{ b.date }}</strong>
                <span>{{ b.timeStart }} — {{ b.timeEnd }}</span>
              </div>
            </td>
            <td>{{ formatPrice(b.totalPrice) }} ₽</td>
            <td><AppBadge :status="b.status" /></td>
            <td>
              <div class="actions">
                <button 
                  v-if="b.status === 'pending'"
                  class="btn-icon btn-confirm" 
                  title="Подтвердить"
                  @click="handleConfirm(b.id)"
                >✓</button>
                <button 
                  v-if="b.status !== 'cancelled'"
                  class="btn-icon btn-cancel" 
                  title="Отменить"
                  @click="handleCancel(b.id)"
                >×</button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredBookings.length === 0">
            <td colspan="6" class="text-center">Бронирований не найдено</td>
          </tr>
        </tbody>
      </table>
    </div>

    <AppToast
      :visible="toast.visible"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>

<style lang="scss" scoped>
.page-title {
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  &__value {
    font-size: 2.5rem;
    font-weight: 700;
    color: $primary-color;
  }

  &__label {
    color: lighten($text-color, 30%);
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
    margin-top: 4px;
  }

  &--pending &__value { color: $warning-color; }
  &--confirmed &__value { color: $success-color; }
}

.filters {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 30px;
  background: white;
  padding: 24px;
  border-radius: 16px;

  .filter-item {
    flex: 1;
    
    label {
      display: block;
      font-size: 0.9rem;
      margin-bottom: 8px;
      color: lighten($text-color, 20%);
    }
  }
}

.admin-select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  outline: none;
  
  &:focus { border-color: $primary-color; }
}

.admin-table-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  
  th {
    background: #f8f9fa;
    text-align: left;
    padding: 16px;
    font-weight: 600;
    color: lighten($text-color, 20%);
    border-bottom: 2px solid #eee;
  }

  td {
    padding: 16px;
    border-bottom: 1px solid #eee;
  }

  .client-info, .time-info {
    display: flex;
    flex-direction: column;
    
    span {
      font-size: 0.85rem;
      color: lighten($text-color, 40%);
    }
  }

  .actions {
    display: flex;
    gap: 8px;
  }

  .btn-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    transition: 0.2s;
    
    &.btn-confirm {
      background: rgba($success-color, 0.1);
      color: $success-color;
      &:hover { background: $success-color; color: white; }
    }
    
    &.btn-cancel {
      background: rgba($danger-color, 0.1);
      color: $danger-color;
      &:hover { background: $danger-color; color: white; }
    }
  }
}

.text-center { text-align: center; }

@media (max-width: 768px) {
  .stats-grid, .filters {
    grid-template-columns: 1fr;
    flex-direction: column;
  }
  .admin-table-wrapper {
    overflow-x: auto;
  }
}
</style>
