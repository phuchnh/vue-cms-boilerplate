import axios from 'axios'
import store from '@/store'
import * as types from '@/store/mutation-types'
import router from '@/router'
import Cookie from 'js-cookie'

const instance = axios.create()
instance.defaults.baseURL = process.env.API_URL
instance.defaults.headers.common['Accept'] = 'application/json'
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Interceptors
instance.interceptors.request.use(
  (config) => {
    if (Cookie.get('token')) {
      config.headers['Authorization'] = `Bearer ${Cookie.get('token')}`
    }
    return config
  }
)

instance.interceptors.response.use(response => response,
  async (error) => {
    // Do something with response error
    const { status } = error.response
    if (status === 401) {
      store.commit(types.LOG_OUT)
      await router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export default instance
