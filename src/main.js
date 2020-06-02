// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuelidate from 'vuelidate'
import VueProgressBar from 'vue-progressbar'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store'
import './plugins'
import './utils/filters'
import { loadingBarOptions, lazyloadImageOptions } from './config'

Vue.use(Vuelidate)
Vue.use(VueProgressBar, loadingBarOptions)
Vue.use(VueLazyload, lazyloadImageOptions)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
