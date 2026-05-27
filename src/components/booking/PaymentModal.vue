<script setup>
import { ref, onMounted, watch } from 'vue'
import QRCode from 'qrcode'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useBookingsStore } from '@/stores/bookings'

const props = defineProps({
  isOpen: Boolean,
  amount: Number,
  bookingData: Object
})

const emit = defineEmits(['close', 'success'])

const bookingsStore = useBookingsStore()
const qrCanvas = ref(null)
const paymentId = ref(null)
const paymentUrl = ref('')
const isLoading = ref(true)
const isVerifying = ref(false)
const error = ref('')

// Функция генерации QR-кода
const generateQRCode = async (canvas, url) => {
  if (canvas && url) {
    try {
      await QRCode.toCanvas(canvas, url, { 
        width: 250,
        margin: 2,
        color: {
          dark: '#2D6A4F',
          light: '#ffffff'
        }
      })
    } catch (err) {
      console.error('Ошибка генерации QR:', err)
    }
  }
}

// Следим за появлением canvas и изменением URL
watch(qrCanvas, (newCanvas) => {
  if (newCanvas) generateQRCode(newCanvas, paymentUrl.value)
})

watch(paymentUrl, (newUrl) => {
  if (newUrl) generateQRCode(qrCanvas.value, newUrl)
})

onMounted(async () => {
  if (props.isOpen) {
    await startPayment()
  }
})

const startPayment = async () => {
  isLoading.value = true
  error.value = ''
  // Заглушка — убрать когда будут реальные ключи
  paymentUrl.value = 'https://osmanskiydvor.ru'
  isLoading.value = false
}

const handleConfirmPayment = async () => {
  isVerifying.value = true
  // Имитируем небольшую задержку проверки
  setTimeout(async () => {
    const bookingResult = await bookingsStore.createBooking(props.bookingData)
    if (bookingResult.success) {
      emit('success')
    } else {
      error.value = bookingResult.message
      isVerifying.value = false
    }
  }, 1000)
}
</script>

<template>
  <AppModal :is-open="isOpen" title="Оплата бронирования" @close="$emit('close')">
    <div class="payment-modal">
      <div v-if="isLoading" class="payment-modal__loading">
        Генерация QR-кода...
      </div>
      
      <div v-else-if="error" class="payment-modal__error">
        <p>{{ error }}</p>
        <AppButton label="Попробовать снова" @click="startPayment" />
      </div>

      <div class="payment-modal__content" v-show="!isLoading && !error">
        <div class="payment-modal__amount">
          Сумма к оплате: <strong>{{ amount }} ₽</strong>
        </div>
        
        <div class="payment-modal__qr">
          <canvas 
            ref="qrCanvas" 
            :style="{ display: paymentUrl ? 'inline-block' : 'none' }"
          ></canvas>
          <p>Отсканируйте QR-код в приложении банка</p>
        </div>

        <div class="payment-modal__instructions">
          <ol>
            <li>Открыйте приложение вашего банка</li>
            <li>Выберите "Оплата по QR-коду"</li>
            <li>Отсканируйте код выше</li>
            <li>Подтвердите платеж</li>
          </ol>
        </div>

        <div class="payment-modal__footer">
          <AppButton 
            label="Я оплатил" 
            :loading="isVerifying" 
            @click="handleConfirmPayment" 
          />
          <AppButton 
            label="Отмена" 
            variant="outline" 
            @click="$emit('close')" 
          />
        </div>
      </div>
    </div>
  </AppModal>
</template>

<style lang="scss" scoped>
.payment-modal {
  text-align: center;

  &__loading {
    padding: 40px;
    color: $primary-color;
    font-weight: 600;
  }

  &__error {
    color: $danger-color;
    padding: 20px;
    p { margin-bottom: 20px; }
  }

  &__amount {
    font-size: 1.2rem;
    margin-bottom: 24px;
    strong { color: $primary-color; font-size: 1.5rem; }
  }

  &__qr {
    background: white;
    padding: 20px;
    border-radius: 12px;
    display: inline-block;
    border: 1px solid #eee;
    margin-bottom: 24px;

    p {
      margin-top: 12px;
      font-size: 0.9rem;
      color: lighten($text-color, 30%);
    }
  }

  &__instructions {
    text-align: left;
    background: $background-color;
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 32px;

    ol {
      padding-left: 20px;
      font-size: 0.9rem;
      color: lighten($text-color, 10%);
      li { margin-bottom: 8px; }
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .app-button {
      width: 100%;
    }
  }
}
</style>
