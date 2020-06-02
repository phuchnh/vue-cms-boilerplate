<template>
  <aside class="navbar navbar-vertical navbar-expand-lg navbar-dark">
    <div class="container">
      <button class="navbar-toggler" data-target="#navbar-menu" data-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand navbar-brand-autodark" href=".">
        <img alt="Tabler" class="navbar-brand-image" src="/static/logo-white.svg">
      </a>
      <div class="collapse navbar-collapse" id="navbar-menu">
        <ul class="navbar-nav pt-lg-3">
          <li :key="item.id" class="nav-item" v-for="item of navigations">
            <router-link :active-class="'active'" :exact="item.exact" :to="{name: item.routeName}" class="nav-link">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
                <component :is="item.icon" class="icon" v-if="item.icon"/>
              </span>
              <span class="nav-link-title">{{ item.title }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import { navigations } from '@/config'

export default {
  name: 'Nav',
  data () {
    return {
      navigations
    }
  }
}
</script>

<style scoped>

</style>
