<template>
  <div class="flex-fill d-flex flex-column justify-content-center">
    <div class="container-tight py-6">
      <div class="text-center mb-4">
        <img alt="" height="36" src="static/logo.svg">
      </div>
      <form @submit.prevent="login()" class="card card-md" novalidate>
        <div class="card-body">
          <h2 class="mb-5 text-center">Login to your account</h2>
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input :class="fieldState($v.form.login_id)" autocomplete="off" class="form-control"
                   type="text"
                   v-model.trim="$v.form.login_id.$model"
            />
          </div>
          <div class="mb-2">
            <label class="form-label">Password</label>
            <div class="input-group input-group-flat">
              <input :class="fieldState($v.form.login_password)" :type="hidePassword ? 'password' : 'text'"
                     class="form-control"
                     v-model.trim="$v.form.login_password.$model"
              />
              <span class="input-group-text">
                <a @click="hidePassword = !hidePassword" class="link-secondary" title="Show password">
                  <eye-icon class="icon"></eye-icon>
                </a>
              </span>
            </div>
          </div>
          <div class="form-footer">
            <button :disabled="$v.form.$invalid || isSubmit" class="btn btn-primary btn-block" type="submit">Sign in</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { EyeIcon } from 'vue-feather-icons'
import { required } from 'vuelidate/lib/validators'
import * as types from '@/store/mutation-types'
import store from '@/store'
import Admin from '@/models/Admin'

export default {
  name: 'Login',
  components: {
    EyeIcon
  },
  data () {
    return {
      hidePassword: true,
      isSubmit: false,
      form: {
        login_id: '',
        login_password: ''
      }
    }
  },
  validations: {
    form: {
      login_id: { required },
      login_password: { required }
    }
  },
  created () {
    store.commit(types.LOG_OUT)
  },
  methods: {
    async login () {
      this.isSubmit = true

      if (this.$v.form.$invalid) {
        this.isSubmit = false
        return
      }

      try {
        const { token } = await Admin.login(this.$v.form.$model)
        this.$store.commit(types.SET_TOKEN, { token })
        const profile = await Admin.profile()
        this.$store.commit(types.SET_PROFILE, { profile })
        await this.$router.push({ name: 'home' })
      } catch (e) {
        this.isSubmit = false
      }
    },
    fieldState (validation) {
      return {
        'is-invalid is-invalid-lite': validation.$error && validation.$dirty,
        'is-valid is-valid-lite': !validation.$invalid
      }
    }
  }
}
</script>

<style scoped>

</style>
