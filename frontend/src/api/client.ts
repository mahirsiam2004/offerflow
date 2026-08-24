import axios from 'axios'
import { auth } from '@/firebase/config'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// Add token to requests
api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser
  if (currentUser) {
    try {
      const token = await currentUser.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    } catch (error) {
      console.error('Error getting token:', error)
    }
  }
  return config
})

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access')
    }
    return Promise.reject(error)
  }
)

export default api
export { api }
