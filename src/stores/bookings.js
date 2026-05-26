import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBookings, createBooking as apiCreateBooking, updateBooking } from '@/api'

export const useBookingsStore = defineStore('bookings', () => {
  const userBookings = ref([])
  const allBookings = ref([])

  const fetchUserBookings = async (userId) => {
    try {
      const { data } = await getBookings({ userId })
      userBookings.value = data
    } catch (error) {
      console.error('Ошибка при загрузке бронирований пользователя:', error)
    }
  }

  const fetchAllBookings = async () => {
    try {
      const { data } = await getBookings()
      allBookings.value = data
    } catch (error) {
      console.error('Ошибка при загрузке всех бронирований:', error)
    }
  }

  const createBooking = async (bookingData) => {
    try {
      // Расчет стоимости: первый час 2000, последующие по 1500 (если hours > 1)
      // В ТЗ: hours === 1 ? 2000 : hours * 1500
      const totalPrice = bookingData.hours === 1 ? 2000 : bookingData.hours * 1500
      
      const fullBooking = {
        ...bookingData,
        totalPrice,
        status: 'pending',
        createdAt: Date.now()
      }

      const { data } = await apiCreateBooking(fullBooking)
      userBookings.value.push(data)
      return { success: true, data }
    } catch (error) {
      return { success: false, message: 'Ошибка при создании бронирования' }
    }
  }

  const cancelBooking = async (id) => {
    try {
      await updateBooking(id, { status: 'cancelled' })
      
      // Обновляем в локальном сторе
      const updateList = (list) => {
        const index = list.findIndex(b => b.id === id)
        if (index !== -1) list[index].status = 'cancelled'
      }
      
      updateList(userBookings.value)
      updateList(allBookings.value)
      
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Ошибка при отмене бронирования' }
    }
  }

  const confirmBooking = async (id) => {
    try {
      await updateBooking(id, { status: 'confirmed' })
      
      const updateList = (list) => {
        const index = list.findIndex(b => b.id === id)
        if (index !== -1) list[index].status = 'confirmed'
      }
      
      updateList(userBookings.value)
      updateList(allBookings.value)
      
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Ошибка при подтверждении бронирования' }
    }
  }

  return {
    userBookings,
    allBookings,
    fetchUserBookings,
    fetchAllBookings,
    createBooking,
    cancelBooking,
    confirmBooking
  }
})
