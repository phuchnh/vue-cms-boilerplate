import Admin from '@/models/Admin'
import store from '@/store'
import { SET_PROFILE } from '@/store/mutation-types'
import isEmpty from 'lodash-es/isEmpty'

export const AuthGuard = async (to, from, next) => {
  if (store.getters.currentUser) {
    next()
    return
  }

  if (!store.getters.isLoggedIn) {
    next({ name: 'login' })
    return
  }

  try {
    const profile = await Admin.profile()
    if (isEmpty(profile)) {
      next({ name: 'login' })
      return
    }
    store.commit(SET_PROFILE, profile)
    next()
  } catch (e) {
    next({ name: 'login' })
    throw e
  }
}
