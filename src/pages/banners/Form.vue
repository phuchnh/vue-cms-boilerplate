<template>
  <div id="BannerForm" class="row">
    <div class="col-12">
      <form class="card">
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label">title</label>
            <input :class="fieldState(fb.title)" class="form-control" type="text" v-model.trim="fb.title.$model">
          </div>
          <div class="mb-3">
            <label class="form-label">publish_start_datetime</label>
            <input :class="fieldState(fb.publish_start_datetime)" class="form-control" type="text"
              v-model.trim="fb.publish_start_datetime.$model"
            >
          </div>
          <div class="mb-3">
            <label class="form-label">publish_end_datetime</label>
            <input :class="fieldState(fb.publish_end_datetime)" class="form-control" type="text"
              v-model.trim="fb.publish_end_datetime.$model"
            >
          </div>
          <div class="mb-3">
            <label class="form-label">display_type</label>
            <input :class="fieldState(fb.display_type)" class="form-control" type="text"
              v-model.trim="fb.display_type.$model"
            >
          </div>
          <div class="mb-3">
            <label class="form-label">is_preview</label>
            <label class="form-check form-switch">
              <input class="form-check-input" type="checkbox" v-model="fb.is_preview.$model">
            </label>
          </div>
          <div class="mb-3">
            <label class="form-label">is_active</label>
            <label class="form-check form-switch">
              <input class="form-check-input" type="checkbox" v-model="fb.is_active.$model">
            </label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  props: ['value'],
  name: 'Form',
  data () {
    return {
      form: {
        title: '',
        publish_start_datetime: '',
        publish_end_datetime: '',
        display_type: '',
        is_preview: false,
        is_active: false
      }
    }
  },
  validations: {
    form: {
      title: { required },
      publish_start_datetime: { required },
      publish_end_datetime: { required },
      display_type: { required },
      is_preview: { required },
      is_active: { required }
    }
  },
  created () {
    // Fill data form
    this.form = Object.assign(this.form, this.value)
  },
  computed: {
    fb () {
      return this.$v.form
    }
  },
  methods: {
    fieldState (validation) {
      return {
        'is-invalid is-invalid-lite': validation.$error && validation.$dirty,
        'is-valid is-valid-lite': !validation.$invalid
      }
    }
  }
}
</script>

<style scoped type="scss">
</style>
