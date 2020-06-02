<template>
  <div class="card shadow my-4">
    <div class="card-body">
      <h3 class="card-title">Search</h3>
      <form role="search" @submit.prevent="search">
        <div class="form-group mb-3 row">
          <label class="form-label col-3 col-form-label">Title</label>
          <div class="col">
            <input type="text" class="form-control" v-model.trim="filter.title">
          </div>
        </div>
        <div class="form-group mb-3 row">
          <label class="form-label col-3 col-form-label">Status</label>
          <div class="col">
            <div class="form-selectgroup">
              <label class="form-selectgroup-item">
                <input type="radio" name="name" value="HTML" class="form-selectgroup-input"
                  v-model.trim="filter.status">
                <span class="form-selectgroup-label">HTML</span>
              </label>
              <label class="form-selectgroup-item">
                <input type="radio" name="name" value="CSS" class="form-selectgroup-input" v-model.trim="filter.status">
                <span class="form-selectgroup-label">CSS</span>
              </label>
              <label class="form-selectgroup-item">
                <input type="radio" name="name" value="PHP" class="form-selectgroup-input" v-model.trim="filter.status">
                <span class="form-selectgroup-label">PHP</span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-group mb-3 row">
          <label class="form-label col-3 col-form-label">Duration</label>
          <div class="col">
            <b-datepicker menu-class="w-50" calendar-width="100%" locale="ja"
              v-model.trim="filter.duration"
              :date-format-options="{ year: 'numeric', day: 'numeric', month: 'numeric' }"
            />
          </div>
        </div>
        <div class="form-footer d-flex justify-content-end">
          <div class="btn-list">
            <button type="submit" class="btn btn-primary">Search</button>
            <button type="button" @click="reset" class="btn btn-secondary">Reset</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      filter: {
        title: '',
        duration: '',
        status: ''
      }
    }
  },
  methods: {
    search () {
      this.$emit('filter-changed', this.filter)
    },
    reset () {
      for (let property in this.filter) {
        if (this.filter.hasOwnProperty(property)) {
          this.filter[property] = ''
        }
      }
      this.$emit('filter-changed', this.filter)
    }
  }
}
</script>

<style scoped>

</style>
