export default {
  isLoggedIn: (state) => {
    return state.auth.isLoggedIn
  },
  currentUser: (state) => {
    return state.auth.profile
  }
}
