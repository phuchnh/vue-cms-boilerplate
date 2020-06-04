<template>
  <header class="navbar navbar-expand-md navbar-light d-none d-lg-flex">
    <div class="container-fluid">
      <button class="navbar-toggler" data-target="#navbar-menu" data-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-nav flex-row order-md-last">
        <div class="nav-item dropdown d-none d-md-flex mr-3">
          <a class="nav-link px-0" data-toggle="dropdown" href="#" tabindex="-1">
            <bell-icon class="icon"/>
            <span class="badge bg-red"></span>
          </a>
          <div class="dropdown-menu dropdown-menu-right dropdown-menu-card">
            <div class="card">
              <div class="card-body">
                Lorem ipsum dolor sit amet
              </div>
            </div>
          </div>
        </div>
        <div class="nav-item dropdown">
          <a class="nav-link d-flex lh-1 text-reset p-0" data-toggle="dropdown" href="#">
            <span class="avatar"></span>
            <div class="d-none d-xl-block pl-2">
              <div>Paweł Kuna</div>
              <div class="mt-1 small text-muted">UI Designer</div>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a @click="logout()" class="dropdown-item">
              <log-out-icon class="icon dropdown-item-icon"></log-out-icon>
              Log Out
            </a>
          </div>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbar-menu">
        <div>
          <form action="." method="get">
            <div class="input-icon">
              <span class="input-icon-addon">
                <svg class="icon" fill="none" height="24" stroke="currentColor" stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                     xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" stroke="none"/>
                  <circle cx="10" cy="10" r="7"/>
                  <line x1="21" x2="15" y1="21" y2="15"/>
                </svg>
              </span>
              <input class="form-control" placeholder="Search…" type="text">
            </div>
          </form>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { BellIcon, LogOutIcon } from 'vue-feather-icons'
import store from '@/store'
import * as types from '@/store/mutation-types'
import Admin from '@/models/Admin'

export default {
  name: 'Header',
  components: {
    LogOutIcon,
    BellIcon
  },
  methods: {
    async logout () {
      try {
        await Admin.logout()
      } catch (e) {}
      store.commit(types.LOG_OUT)
      await this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>

</style>
