<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCabinsStore } from '@/stores/cabins'
import { useBookingsStore } from '@/stores/bookings'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import DurationPicker from './DurationPicker.vue'
import TimeSlotPicker from './TimeSlotPicker.vue'

const props = defineProps({
  cabinId: {
    type: [String, Number],
    required: true
  }
})

const router = useRouter()
const authStore = useAuthStore()
const cabinsStore = useCabinsStore()
const bookingsStore = useBookingsStore()

const cabin = ref(null)
const bookedSlots = ref([])
const loading = ref(false)
const submitLoading = ref(false)

const date = ref(new Date().toISOString().split('T')[0])
const timeStart = ref('')
const hours = ref(1)

const minDate = new Date().toISOString().split('T')[0]

const timeEnd = computed(() => {
  if (!timeStart.value) return ''
  const [h, m] = timeStart.value.split(':').map(Number)
  return `${(h + hours.value).toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
})

const totalPrice = computed(() => {
  return hours.value === 1 ? 2000 : hours.value * 1500
})

const isFormValid = computed(() => {
  return date.value && timeStart.value && hours.value
})

const fetchCabinData = async () => {
  if (!cabinsStore.cabins.length) {
    await cabinsStore.fetchCabins()
  }
  cabin.value = cabinsStore.cabins.find(c => c.id === Number(props.cabinId))
}

const fetchSlots = async () => {
  loading.value = true
  bookedSlots.value = await cabinsStore.getBookedSlots(Number(props.cabinId), date.value)
  timeStart.value = '' // Сброс времени при смене даты
  loading.value = false
}

const handleSubmit = async () => {
  if (!isFormValid.value) return

  submitLoading.value = true
  
  const bookingData = {
    userId: authStore.currentUser.id,
    userName: authStore.currentUser.name,
    userPhone: authStore.currentUser.phone,
    cabinId: cabin.value.id,
    cabinName: cabin.value.name,
    date: date.value,
    timeStart: timeStart.value,
    timeEnd: timeEnd.value,
    hours: hours.value,
    totalPrice: totalPrice.value
  }

  const result = await bookingsStore.createBooking(bookingData)
  
  if (result.success) {
    // В реальном приложении здесь был бы вызов toast
    alert('Бронирование успешно оформлено!')
    router.push('/profile')
  } else {
    alert(result.message)
  }
  
  submitLoading.value = false
}

onMounted(async () => {
  await fetchCabinData()
  await fetchSlots()
})

watch([date, () => props.cabinId], fetchSlots)
</script>

<template>
  <div v-if="cabin" class="booking-form-container">
    <div class="booking-header">
      <h2>Бронирование: {{ cabin.name }}</h2>
      <p>{{ cabin.description }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="booking-form">
      <div class="form-section">
        <AppInput 
          v-model="date" 
          type="date" 
          label="Выберите дату" 
          :min="minDate"
          required
        />
      </div>

      <div class="form-section">
        <DurationPicker v-model="hours" />
      </div>

      <div class="form-section">
        <TimeSlotPicker 
          v-model="timeStart" 
          :booked-slots="bookedSlots" 
          :duration="hours"
          :loading="loading"
        />
      </div>

      <div class="form-footer">
        <div class="summary">
          <div class="summary-item">
            <span>Итого к оплате:</span>
            <strong>{{ totalPrice.toLocaleString() }} ₽</strong>
          </div>
          <p v-if="timeStart" class="summary-hint">
            Ваше время: {{ timeStart }} – {{ timeEnd }}
          </p>
        </div>

        <AppButton 
          label="Подтвердить бронирование" 
          type="submit"
          :disabled="!isFormValid || submitLoading"
          :loading="submitLoading"
        />
      </div>
    </form>
  </div>
  <div v-else class="loading-state">
    Загрузка данных кабинки...
  </div>
</template>

<style lang="scss" scoped>
.booking-form-container {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .booking-header {
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;

    h2 {
      font-family: $font-header;
      color: $primary-color;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      font-size: 14px;
    }
  }

  .form-section {
    margin-bottom: 30px;
  }

  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eee;
    padding-top: 30px;
    margin-top: 30px;

    .summary {
      .summary-item {
        font-size: 18px;
        margin-bottom: 5px;
        
        strong {
          color: $primary-color;
          font-size: 24px;
          margin-left: 10px;
        }
      }

      .summary-hint {
        font-size: 14px;
        color: #888;
      }
    }
  }
}

.loading-state {
  text-align: center;
  padding: 50px;
  color: #888;
}

@media (max-width: 768px) {
  .form-footer {
    flex-direction: column;
    gap: 20px;
    text-align: center;

    .summary-item {
      flex-direction: column;
      gap: 5px;
    }
  }
}
</style>
