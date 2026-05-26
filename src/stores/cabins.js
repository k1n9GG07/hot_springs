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
      console.error('Ошибка при загрузке кабинок:', error)
    }
  }

  const getBookedSlots = async (cabinId, date) => {
    try {
      const { data: bookings } = await getBookings({ cabinId, date })
      // Фильтруем только активные или подтвержденные брони
      return bookings
        .filter(b => b.status !== 'cancelled')
        .map(b => ({
          timeStart: b.timeStart,
          timeEnd: b.timeEnd
        }))
    } catch (error) {
      console.error('Ошибка при загрузке занятых слотов:', error)
      return []
    }
  }

  return {
    cabins,
    fetchCabins,
    getBookedSlots
  }
})
