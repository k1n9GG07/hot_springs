import axios from 'axios'

const api = axios.create({
  baseURL: 'https://hotsprings-production-a48b.up.railway.app',
  timeout: 10000
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

export default api
