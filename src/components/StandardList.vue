<script>
import Vue from 'vue'
export default {
  name: 'StandardList',
  async beforeRouteEnter (to, from, next) {
    if (Vue.prototype.$model === undefined) {
      throw new Error('You should override model in component. Example: Vue.prototype.$model = Banner')
    }
    const resp = await Vue.prototype.$model.paginateCustom()
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
      fields: {},
      sorter: {
        sortColumn: 'updated_at',
        sortDirection: 'desc'
      }
    }
  },
  created () {
    this.collection = this.$route.meta['collection']
    this.pagination = this.$route.meta['pagination']
  },
  methods: {
    async fetchCollection () {
      this.loading = true
      try {
        const resp = await this.$model.paginateCustom({
          page: this.pagination.currentPage,
          perPage: this.pagination.perPage,
          sortColumn: this.sorter.sortColumn,
          sortDirection: this.sorter.sortDirection,
          filter: this.filter,
          fields: this.fields
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
