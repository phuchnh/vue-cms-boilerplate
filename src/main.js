// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import './plugins'
import './utils'

// Styles
import './assets/less/app.less'
import './assets/css/tabler-buttons.min.css'
import './assets/css/tabler.min.css'
import './assets/scss/app.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
