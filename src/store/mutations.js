import { SET_IS_LOGGED_IN, SET_LAYOUT, SET_PROFILE } from './mutation-types'

export default {
  [SET_LAYOUT] (state, payload) {
    state.layout = payload
  },
  [SET_IS_LOGGED_IN] (state, isLoggedIn = false) {
    state.auth.isLoggedIn = isLoggedIn
  },
  [SET_PROFILE] (state, profile = {}) {
    state.auth.profile = profile
  }
}
