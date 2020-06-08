<template>
  <div class="card card-sm shadow my-4">
    <div class="card-body p-0">
      <a-table
        :tableLayout="'auto'"
        :data-source="dataSource"
        :loading="loading"
        :row-key="record => record.id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <slot/>
      </a-table>
    </div>
  </div>
</template>

<script>
import { PER_PAGE, PER_PAGE_OPTIONS } from '@/config'

export default {
  name: 'StandardTable',
  inheritAttrs: false,
  props: {
    sortColumn: { type: String, required: false, default: null },
    sortDirection: { type: String, required: false, default: null },
    total: { type: Number, required: true, default: 0 },
    currentPage: { type: Number, required: true, default: 0 },
    perPage: { type: Number, required: true, default: PER_PAGE },
    loading: { type: Boolean, required: false, default: false },
    dataSource: { type: Array, required: true, default: () => [] },
    pageSizeOptions: { type: Array, default: () => PER_PAGE_OPTIONS.map(item => item.toString()) }
  },
  computed: {
    pagination () {
      return {
        position: 'both',
        showSizeChanger: true,
        pageSizeOptions: this.pageSizeOptions,
        total: this.total,
        current: this.currentPage,
        defaultPageSize: this.perPage,
        pageSize: this.perPage,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        buildOptionText: (pageSize) => `${pageSize.value} / page`
      }
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      if (this.detectSortChange(sorter)) {
        pagination.current = 1 // Reset pagination or sort change
      }
      this.$emit('update:currentPage', pagination.current)
      this.$emit('update:perPage', pagination.pageSize)
      this.$emit('update:sortColumn', sorter.columnKey)
      this.$emit('update:sortDirection', this.getSortDirection(sorter.order))
      this.$emit('change', {
        page: pagination.current,
        perPage: pagination.pageSize,
        sortColumn: sorter.columnKey,
        sortDirection: this.getSortDirection(sorter.order)
      })
    },
    getSortDirection (value) {
      switch (value) {
        case 'ascend':
          return 'asc'
        case 'asc':
          return 'ascend'
        case 'descend':
          return 'desc'
        case 'desc':
          return 'descend'
        default:
          return null
      }
    },
    detectSortChange ({ columnKey, order }) {
      if (!columnKey || !order) {
        return false
      }
      return columnKey !== this.sortColumn || order !== this.getSortDirection(this.sortDirection)
    }
  }
}
</script>

<style scoped>

</style>
