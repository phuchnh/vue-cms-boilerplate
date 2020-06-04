<template>
  <div id="app">
    <vue-progress-bar/>
    <transition name="page" mode="out-in">
      <component :is="layout" v-if="layout"/>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    'auth': () => import(/* webpackChunkName: "auth" */ '@/layouts/Auth.vue'),
    'default': () => import(/* webpackChunkName: "default" */ '@/layouts/Default.vue')
  },
  computed: {
    ...mapGetters(['layout'])
  }
}
</script>
