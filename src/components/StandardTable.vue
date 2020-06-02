<template>
  <div class="card card-sm shadow my-4">
    <div class="card-body">
      <Pagination :current-page.sync="currentPage" :per-page.sync="perPage" :total="totalRecords"/>
    </div>
    <b-table class="card-table table-vcenter"
      :busy="isLoading"
      :items="dataSource"
      :fields="columns"
      :sort-by="sortColumn"
      :sort-desc="sortDesc"
      :no-local-sorting="true"
      :no-sort-reset="true"
      stacked="sm"
      responsive="sm"
      show-empty
      sort-icon-left
      hover
    >
      <template v-slot:cell()="data">
        <slot name="test1" v-bind:test1="data"/>
      </template>
      <template v-slot:empty="scope">
        <div class="empty">
          <div class="empty-icon">
            <img src="/static/illustrations/undraw_printing_invoices_5r4r.svg" class="h-8 mb-4" alt="">
          </div>
          <p class="empty-title h3">{{ scope.emptyText }}</p>
        </div>
      </template>
    </b-table>
    <div class="card-body border-top">
      <Pagination :current-page.sync="currentPage" :per-page.sync="perPage" :total="totalRecords"/>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination'

export default {
  name: 'StandardTable',
  components: {
    Pagination
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalRecords: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    sortValue: {
      type: String,
      required: true
    },
    sortColumn: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true,
      default: false
    },
    columns: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    dataSource: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  computed: {
    sortDesc () {
      return this.sortValue === 'desc'
    }
  }
}
</script>

<style scoped>

</style>
