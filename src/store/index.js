import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import isEmpty from 'lodash-es/isEmpty'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: 'default',
    auth: {
      isLoggedIn: !isEmpty(localStorage.getItem('token')),
      profile: null
    }
  },
  getters,
  mutations,
  actions
})
