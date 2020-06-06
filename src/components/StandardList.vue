<script>
import Banner from '@/models/Banner'

export default {
  name: 'StandardList',
  async beforeRouteEnter (to, from, next) {
    const resp = await Banner.paginateCustom()
    to.meta['collection'] = resp.data
    to.meta['pagination'] = resp.pagination
    return next()
  },
  data () {
    return {
      loading: false,
      collection: [],
      pagination: {},
      filter: {},
      sorter: {
        sortColumn: 'updated_at',
        sortDirection: 'desc'
      }
    }
  },
  created () {
    this.collection = this.$route.meta['collection']
    this.pagination = this.$route.meta['pagination']
    console.log('from parent')
  },
  methods: {
    async fetchCollection () {
      this.loading = true
      try {
        const resp = await Banner.paginateCustom({
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
</script>
