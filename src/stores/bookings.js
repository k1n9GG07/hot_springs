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
      console.error('Error fetching user bookings:', error)
    }
  }

  const fetchAllBookings = async () => {
    try {
      const { data } = await getBookings()
      allBookings.value = data
    } catch (error) {
      console.error('Error fetching all bookings:', error)
    }
  }

  const createBooking = async (bookingData) => {
    try {
      const totalPrice = bookingData.hours === 1 ? 2000 : bookingData.hours * 1500
      
      const newBooking = {
        ...bookingData,
        totalPrice,
        status: 'pending',
        createdAt: Date.now()
      }

      const { data } = await apiCreateBooking(newBooking)
      userBookings.value.push(data)
      return { success: true, data }
    } catch (error) {
      console.error('Error creating booking:', error)
      return { success: false, message: 'Ошибка при создании бронирования' }
    }
  }

  const cancelBooking = async (id) => {
    try {
      await updateBooking(id, { status: 'cancelled' })
      
      // Обновляем локальные стейты
      const updateList = (list) => {
        const index = list.findIndex(b => b.id === id)
        if (index !== -1) list[index].status = 'cancelled'
      }
      
      updateList(userBookings.value)
      updateList(allBookings.value)
      
      return { success: true }
    } catch (error) {
      console.error('Error cancelling booking:', error)
      return { success: false }
    }
  }

  const confirmBooking = async (id) => {
    try {
      await updateBooking(id, { status: 'confirmed' })
      
      const updateList = (list) => {
        const index = list.findIndex(b => b.id === id)
        if (index !== -1) list[index].status = 'confirmed'
      }
      
      updateList(allBookings.value)
      updateList(userBookings.value)
      
      return { success: true }
    } catch (error) {
      console.error('Error confirming booking:', error)
      return { success: false }
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
