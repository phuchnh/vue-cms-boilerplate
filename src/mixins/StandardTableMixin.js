export const StandardTableMixin = (model) => {
  return {
    async beforeRouteEnter (to, from, next) {
      const resp = await model.paginateCustom()
      to.meta['collection'] = resp.data
      to.meta['pagination'] = resp.pagination
      return next()
    },
    methods: {
      async fetchCollection () {
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
}
