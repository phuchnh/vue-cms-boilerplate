<script>
export default {
  name: 'StandardList',
  data () {
    return {
      loading: false,
      collection: [],
      pagination: {},
      filter: {},
      fields: {},
      sorter: {
        sortColumn: 'updated_at',
        sortDirection: 'desc'
      }
    }
  },
  methods: {
    afterFetchList () {
      if (this.$refs.table) {
        const container = this.$refs.table.$el
        console.log(container.scrollHeight)
        window.sroll(0, container.scrollHeight)
      }
    },
    async fetchCollection () {
      this.loading = true
      try {
        const resp = await this.$model.paginate({
          query: this.$model.queryBuilder({
            fields: { banners: this.$model.displayFields.join(',') },
            page: this.pagination.currentPage,
            perPage: this.pagination.perPage,
            sortColumn: this.sorter.sortColumn,
            sortDirection: this.sorter.sortDirection,
            filter: this.filter
          })
        })
        this.collection = resp.data
        this.pagination = resp.pagination
        this.loading = false
        this.afterFetchList()
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
