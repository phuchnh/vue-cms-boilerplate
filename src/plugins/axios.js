import axios from 'axios'
import store from '@/store'

const instance = axios.create()
instance.defaults.baseURL = process.env.API_URL
instance.defaults.headers.common['Accept'] = 'application/json'
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Interceptors
instance.interceptors.request.use(
  (config) => {
    if (store.getters.isLoggedIn) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  }
)

export default instance
