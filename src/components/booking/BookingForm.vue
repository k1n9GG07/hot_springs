<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCabinsStore } from '@/stores/cabins'
import { useBookingsStore } from '@/stores/bookings'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppToast from '@/components/ui/AppToast.vue'
import DurationPicker from './DurationPicker.vue'
import TimeSlotPicker from './TimeSlotPicker.vue'

const props = defineProps({
  cabinId: {
    type: [Number, String],
    required: true
  }
})

const router = useRouter()
const cabinsStore = useCabinsStore()
const bookingsStore = useBookingsStore()
const authStore = useAuthStore()

// State
const cabin = ref(null)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedTime = ref('')
const duration = ref(1)
const bookedSlots = ref([])
const loading = ref(false)
const toast = ref({ visible: false, message: '', type: 'success' })

// Min date is today
const minDate = new Date().toISOString().split('T')[0]

const cabinInfo = computed(() => {
  return cabinsStore.cabins.find(c => c.id === Number(props.cabinId))
})

const fetchBookedSlots = async () => {
  if (props.cabinId && selectedDate.value) {
    bookedSlots.value = await cabinsStore.getBookedSlots(props.cabinId, selectedDate.value)
    // Сбросить выбранное время если оно теперь недоступно
    selectedTime.value = ''
  }
}

onMounted(async () => {
  if (cabinsStore.cabins.length === 0) {
    await cabinsStore.fetchCabins()
  }
  cabin.value = cabinInfo.value
  await fetchBookedSlots()
})

watch([selectedDate, () => props.cabinId], fetchBookedSlots)

const calculateTimeEnd = (start, hours) => {
  const [h, m] = start.split(':').map(Number)
  const endH = h + hours
  return `${endH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

const showToast = (message, type = 'success') => {
  toast.value = { visible: true, message, type }
  setTimeout(() => {
    toast.value.visible = false
  }, 3000)
}

const handleSubmit = async () => {
  if (!selectedTime.value) {
    showToast('Пожалуйста, выберите время начала', 'error')
    return
  }

  loading.value = true
  const bookingData = {
    userId: authStore.currentUser.id,
    userName: authStore.currentUser.name,
    userPhone: authStore.currentUser.phone,
    cabinId: Number(props.cabinId),
    cabinName: cabin.value.name,
    date: selectedDate.value,
    timeStart: selectedTime.value,
    timeEnd: calculateTimeEnd(selectedTime.value, duration.value),
    hours: duration.value
  }

  const result = await bookingsStore.createBooking(bookingData)
  
  if (result.success) {
    showToast('Бронь успешно оформлена!')
    setTimeout(() => {
      router.push('/profile')
    }, 1500)
  } else {
    showToast(result.message || 'Ошибка при бронировании', 'error')
    loading.value = false
  }
}
</script>

<template>
  <div class="booking-form" v-if="cabin">
    <div class="booking-form__header">
      <h2>Бронирование: {{ cabin.name }}</h2>
      <p>Вместимость: до {{ cabin.capacity }} человек</p>
    </div>

    <form @submit.prevent="handleSubmit" class="booking-form__body">
      <div class="booking-form__section">
        <AppInput
          label="Дата отдыха"
          type="date"
          v-model="selectedDate"
          :min="minDate"
        />
      </div>

      <div class="booking-form__section">
        <DurationPicker v-model="duration" />
      </div>

      <div class="booking-form__section">
        <TimeSlotPicker
          v-model="selectedTime"
          :booked-slots="bookedSlots"
          :duration="duration"
        />
      </div>

      <div class="booking-form__footer">
        <AppButton
          label="Подтвердить бронирование"
          type="submit"
          :loading="loading"
          :disabled="!selectedTime"
        />
      </div>
    </form>

    <AppToast
      :visible="toast.visible"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
  <div v-else class="booking-form-loader">
    Загрузка данных кабинки...
  </div>
</template>

<style lang="scss" scoped>
.booking-form {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: 0 auto;

  &__header {
    margin-bottom: 32px;
    text-align: center;

    h2 {
      color: $primary-color;
      font-size: 1.8rem;
      margin-bottom: 8px;
    }

    p {
      color: lighten($text-color, 30%);
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__footer {
    margin-top: 16px;
    
    .app-button {
      width: 100%;
      height: 50px;
    }
  }
}

.booking-form-loader {
  text-align: center;
  padding: 40px;
  color: $primary-color;
  font-weight: 600;
}
</style>
