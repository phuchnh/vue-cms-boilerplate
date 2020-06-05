<template>
  <div class="card shadow my-4">
    <div class="card-body">
      <h3 class="card-title">
        <slot name="title">Search</slot>
      </h3>
      <form role="search" @submit.prevent="search">
        <slot/>
        <div class="form-footer d-flex justify-content-end">
          <div class="btn-list">
            <button type="submit" class="btn btn-primary">
              <slot name="submit">Submit</slot>
            </button>
            <button type="button" @click="reset" class="btn btn-secondary">
              <slot name="reset">Reset</slot>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Search',
  inheritAttrs: false,
  props: {
    page: {
      type: Number
    },
    filter: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    search () {
      this.filterChange()
    },
    reset () {
      for (let property in this.filter) {
        if (this.filter.hasOwnProperty(property)) {
          this.filter[property] = null
        }
      }
      this.filterChange()
    },
    filterChange () {
      this.$emit('update:filter', this.filter)
      this.$emit('update:page', 1)
      this.$emit('onSearch')
    }
  }
}
</script>

<style scoped>

</style>
