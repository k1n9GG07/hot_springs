<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBookingsStore } from '@/stores/bookings'
import { useCabinsStore } from '@/stores/cabins'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppBadge from '@/components/ui/AppBadge.vue'

const router = useRouter()
const authStore = useAuthStore()
const bookingsStore = useBookingsStore()
const cabinsStore = useCabinsStore()

const filterCabin = ref('')
const filterDate = ref('')

const stats = computed(() => {
  const all = bookingsStore.allBookings
  return {
    total: all.length,
    pending: all.filter(b => b.status === 'pending').length,
    confirmed: all.filter(b => b.status === 'confirmed').length
  }
})

const filteredBookings = computed(() => {
  return bookingsStore.allBookings.filter(b => {
    const matchesCabin = !filterCabin.value || b.cabinId === Number(filterCabin.value)
    const matchesDate = !filterDate.value || b.date === filterDate.value
    return matchesCabin && matchesDate
  }).sort((a, b) => new Date(b.date + ' ' + b.timeStart) - new Date(a.date + ' ' + a.timeStart))
})

const handleConfirm = async (id) => {
  await bookingsStore.confirmBooking(id)
  await bookingsStore.fetchAllBookings()
}

const handleCancel = async (id) => {
  if (confirm('Отменить это бронирование?')) {
    await bookingsStore.cancelBooking(id)
    await bookingsStore.fetchAllBookings()
  }
}

onMounted(async () => {
  if (!authStore.isAdmin) {
    router.push('/')
    return
  }
  await bookingsStore.fetchAllBookings()
  if (!cabinsStore.cabins.length) await cabinsStore.fetchCabins()
})
</script>

<template>
  <div class="admin-view">
    <div class="admin-header">
      <h1>Панель администратора</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Всего броней</span>
          <span class="stat-value">{{ stats.total }}</span>
        </div>
        <div class="stat-card warning">
          <span class="stat-label">Ожидают</span>
          <span class="stat-value">{{ stats.pending }}</span>
        </div>
        <div class="stat-card success">
          <span class="stat-label">Подтверждено</span>
          <span class="stat-value">{{ stats.confirmed }}</span>
        </div>
      </div>
    </div>

    <div class="admin-controls">
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
          <AppInput v-model="filterDate" type="date" label="Дата" />
        </div>
      </div>
    </div>

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
                <span>{{ b.timeStart }} – {{ b.timeEnd }}</span>
              </div>
            </td>
            <td>{{ b.totalPrice.toLocaleString() }} ₽</td>
            <td><AppBadge :status="b.status" /></td>
            <td>
              <div class="table-actions">
                <button 
                  v-if="b.status === 'pending'" 
                  class="action-btn success" 
                  @click="handleConfirm(b.id)"
                  title="Подтвердить"
                >✓</button>
                <button 
                  v-if="b.status !== 'cancelled'" 
                  class="action-btn danger" 
                  @click="handleCancel(b.id)"
                  title="Отменить"
                >×</button>
              </div>
            </td>
          </tr>
          <tr v-if="!filteredBookings.length">
            <td colspan="6" class="empty-table">Бронирований не найдено</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-view {
  .admin-header {
    margin-bottom: 40px;
    
    h1 {
      font-size: 32px;
      color: $primary-color;
      margin-bottom: 30px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;

      .stat-card {
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        display: flex;
        flex-direction: column;
        
        .stat-label { font-size: 14px; color: #888; margin-bottom: 5px; }
        .stat-value { font-size: 24px; font-weight: 700; color: $text-color; }

        &.warning .stat-value { color: $warning-color; }
        &.success .stat-value { color: $success-color; }
      }
    }
  }

  .admin-controls {
    background: white;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);

    .filters {
      display: flex;
      gap: 30px;
      align-items: flex-end;

      .filter-item {
        flex: 1;
        label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 6px; }
      }
    }
  }

  .admin-select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: $font-body;
    outline: none;
    &:focus { border-color: $primary-color; }
  }

  .admin-table-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    overflow-x: auto;
  }

  .admin-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;

    th {
      background: #f8f9fa;
      padding: 15px 20px;
      font-weight: 600;
      color: #666;
      border-bottom: 2px solid #eee;
    }

    td {
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
      vertical-align: middle;
    }

    .client-info, .time-info {
      display: flex;
      flex-direction: column;
      span { font-size: 13px; color: #888; }
    }

    .table-actions {
      display: flex;
      gap: 10px;

      .action-btn {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        transition: 0.2s;
        color: white;

        &.success { background: $success-color; &:hover { background: darken($success-color, 10%); } }
        &.danger { background: $danger-color; &:hover { background: darken($danger-color, 10%); } }
      }
    }

    .empty-table { text-align: center; padding: 40px; color: #999; }
  }
}
</style>
