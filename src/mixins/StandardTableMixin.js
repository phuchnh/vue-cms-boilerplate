export const StandardTableMixin = {
  data () {
    return {
      loading: false,
      collection: [],
      pagination: {},
      filter: {},
      sorter: { sortColumn: 'updated_at', sortDirection: 'desc' }
    }
  },
  created () {
    this.collection = this.$route.meta['collection']
    this.pagination = this.$route.meta['pagination']
  },
  methods: {
    async fetchList (model) {
      this.loading = true
      try {
        const resp = await model.paginateCustom({
          page: this.pagination.currentPage,
          perPage: this.pagination.perPage,
          sortColumn: this.sorter.sortColumn,
          sortDirection: this.sorter.sortDirection,
          filter: this.filter
        })
        this.collection = resp.data
        this.pagination = resp.pagination
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
