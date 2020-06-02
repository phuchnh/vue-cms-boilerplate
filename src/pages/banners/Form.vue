<template>
  <div id="BannerForm">
    <div class="mb-3">
      <label class="form-label">title</label>
      <input :class="fieldStatus($v.form.title)" class="form-control" type="text" v-model="$v.form.title.$model">
    </div>
    <div class="mb-3">
      <label class="form-label">publish_start_datetime</label>
      <input :class="fieldStatus($v.form.publish_start_datetime)" class="form-control" type="text"
             v-model="$v.form.publish_start_datetime.$model"
      >
    </div>
    <div class="mb-3">
      <label class="form-label">publish_end_datetime</label>
      <input :class="fieldStatus($v.form.publish_end_datetime)" class="form-control" type="text"
             v-model="$v.form.publish_end_datetime.$model"
      >
    </div>
    <div class="mb-3">
      <label class="form-label">display_type</label>
      <input :class="fieldStatus($v.form.publish_end_datetime)" class="form-control" type="text"
             v-model="$v.form.display_type.$model"
      >
    </div>
    <div class="mb-3">
      <label class="form-label">is_preview</label>
      <label class="form-check form-switch">
        <input class="form-check-input" type="checkbox" v-model="$v.form.is_preview.$model">
      </label>
    </div>
    <div class="mb-3">
      <label class="form-label">is_active</label>
      <label class="form-check form-switch">
        <input class="form-check-input" type="checkbox" v-model="$v.form.is_active.$model">
      </label>
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
      is_preview: {},
      is_active: {}
    }
  },
  created () {
    this.form = this.value || {}
  },
  methods: {
    fieldStatus (validation) {
      return {
        'is-invalid is-invalid-lite': validation.$invalid && validation.$dirty,
        'is-valid is-valid-lite': !validation.$invalid
      }
    }
  }
}
</script>

<style scoped>

</style>
