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
    async fetchCollection () {
      this.loading = true
      try {
        const resp = await this.$model.paginate({
          query: this.$model.serialize({
            fields: { banners: this.$model.fields.join(',') },
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
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
