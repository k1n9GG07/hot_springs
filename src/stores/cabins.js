import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCabins, getBookings } from '@/api'

export const useCabinsStore = defineStore('cabins', () => {
  const cabins = ref([])

  const fetchCabins = async () => {
    try {
      const { data } = await getCabins()
      cabins.value = data
    } catch (error) {
      console.error('Error fetching cabins:', error)
    }
  }

  const getBookedSlots = async (cabinId, date) => {
    try {
      const { data } = await getBookings({ cabinId, date })
      // Возвращаем массив занятых слотов { timeStart, timeEnd }
      return data
        .filter(booking => booking.status !== 'cancelled')
        .map(booking => ({
          timeStart: booking.timeStart,
          timeEnd: booking.timeEnd
        }))
    } catch (error) {
      console.error('Error fetching booked slots:', error)
      return []
    }
  }

  return {
    cabins,
    fetchCabins,
    getBookedSlots
  }
})
