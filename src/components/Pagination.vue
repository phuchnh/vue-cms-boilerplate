<template>
  <div class="d-md-flex justify-content-md-between justify-content-center align-items-start">
    <div class="mb-3">
      <select class="form-select w-100" @change="onPerPageChanged($event.target.value)">
        <option v-for="(option, index) of perPageOptions" :key="index" :value="option">{{ option }}</option>
      </select>
    </div>
    <b-pagination
      :value="currentPage"
      :total-rows="total"
      :per-page="perPage"
      @change="onPageChanged($event)"
    />
    <div class="m-0 text-muted">Showing <span>{{startIndex}}</span> to <span>{{endIndex}}</span> of <span>{{total}}</span>
      entries
    </div>
  </div>
</template>

<script>
import { PER_PAGE_OPTIONS } from '@/config'

export default {
  name: 'Pagination',
  props: {
    perPageOptions: {
      type: Array,
      default: function () {
        return PER_PAGE_OPTIONS
      }
    },
    currentPage: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    startIndex () {
      return (this.currentPage - 1) * this.perPage + 1
    },
    endIndex () {
      const endIndex = this.currentPage * this.perPage
      return endIndex > this.total ? this.total : endIndex
    }
  },
  methods: {
    onPerPageChanged (perPage) {
      this.$emit('update:currentPage', 1)
      this.$emit('update:perPage', 1)
      this.$emit('pageChanged', { currentPage: 1, perPage: perPage })
    },
    onPageChanged (currentPage) {
      this.$emit('update:currentPage', currentPage)
      this.$emit('pageChanged', { currentPage: currentPage, perPage: this.perPage })
    }
  }
}
</script>

<style scoped>

</style>
