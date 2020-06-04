import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import Cookie from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      layout: 'default',
      profile: null,
      token: Cookie.get('token')
    }
  },
  getters: {
    profile: state => state.profile,
    hasToken: state => state.token,
    layout: state => state.layout || 'default'
  },
  mutations: {
    [types.SET_LAYOUT] (state, { layout }) {
      state.layout = layout
    },
    [types.SET_PROFILE] (state, { profile }) {
      state.profile = profile
    },
    [types.SET_TOKEN] (state, { token }) {
      state.token = token
      Cookie.set('token', token)
    },
    [types.LOG_OUT] (state) {
      state.token = null
      state.profile = null
      Cookie.remove('token')
    }
  }
})
