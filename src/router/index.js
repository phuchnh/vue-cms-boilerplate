import Vue from 'vue'
import Router from 'vue-router'
import { routes } from '@/router/routes'
import store from '@/store'
import head from 'lodash-es/head'
import { SET_LAYOUT } from '@/store/mutation-types'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

/**
 * Global Before Guards
 *
 * @param to
 * @param from
 * @param next
 * @returns {Promise<void>}
 */
const beforeEach = async (to, from, next) => {
  const currentRoute = head(to.matched)
  store.commit(SET_LAYOUT, currentRoute.meta.layout)
  router.app.$Progress.start()
  next()
}

/**
 * Global After Hooks
 *
 * @returns {Promise<void>}
 */
const afterEach = async () => {
  document.getElementById('loading').style.display = 'none'
  router.app.$Progress.finish()
}

router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
