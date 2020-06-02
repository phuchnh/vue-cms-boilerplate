import store from '@/store'

export const LoginGuard = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next()
    return
  }
  next({ name: 'home' })
}
