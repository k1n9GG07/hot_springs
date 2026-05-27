import axios from 'axios'
import { generateToken } from '@/utils/payment'

const api = axios.create({
  baseURL: 'https://hotsprings-production-a48b.up.railway.app',
  timeout: 10000
})

// Конфигурация Т-Банк (в реальном проекте вынести в .env)
const T_BANK_CONFIG = {
  TERMINAL_KEY: 'TinkoffBankTest', // Тестовый ключ
  SECRET_KEY: 'TinkoffBankTest',   // Тестовый секрет
  API_URL: 'https://securepay.tinkoff.ru/v2/'
}

const tbankApi = axios.create({
  baseURL: T_BANK_CONFIG.API_URL,
  timeout: 15000
})

// Users
export const getUsers = () => api.get('/users')
export const createUser = (data) => api.post('/users', data)

// Cabins
export const getCabins = () => api.get('/cabins')

// Bookings
export const getBookings = (params = {}) => api.get('/bookings', { params })
export const createBooking = (data) => api.post('/bookings', data)
export const updateBooking = (id, data) => api.patch(`/bookings/${id}`, data)

// T-Bank Payment API
export const createPayment = async (amount, orderId, description = 'Оплата бронирования') => {
  const payload = {
    TerminalKey: T_BANK_CONFIG.TERMINAL_KEY,
    Amount: amount * 100, // В копейках
    OrderId: orderId.toString(),
    Description: description
  }

  // Генерация токена
  payload.Token = await generateToken(payload, T_BANK_CONFIG.SECRET_KEY)

  try {
    const { data } = await tbankApi.post('Init', payload)
    
    if (data.Success) {
      return {
        success: true,
        data: {
          paymentId: data.PaymentId,
          paymentUrl: data.PaymentURL,
          amount: amount
        }
      }
    } else {
      throw new Error(data.Message || 'Ошибка инициализации платежа')
    }
  } catch (error) {
    console.error('T-Bank Init Error:', error)
    return { success: false, message: error.message }
  }
}

export const checkPaymentStatus = async (paymentId) => {
  const payload = {
    TerminalKey: T_BANK_CONFIG.TERMINAL_KEY,
    PaymentId: paymentId.toString()
  }

  // Генерация токена
  payload.Token = await generateToken(payload, T_BANK_CONFIG.SECRET_KEY)

  try {
    const { data } = await tbankApi.post('GetState', payload)
    
    if (data.Success) {
      return {
        success: true,
        data: { status: data.Status } // Статусы: CONFIRMED, REJECTED, etc.
      }
    } else {
      throw new Error(data.Message || 'Ошибка проверки статуса')
    }
  } catch (error) {
    console.error('T-Bank GetState Error:', error)
    return { success: false, message: error.message }
  }
}

export default api
