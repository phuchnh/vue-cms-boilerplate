<template>
  <div id="BannerIndex">
    <div class="btn-list">
      <router-link :to="{name: 'banners.create'}" class="btn btn-success" tag="button">
        Create New Banner
      </router-link>
    </div>
    <Search @filter-changed="onFilterChange($event)"/>
    <StandardTable
      :columns="fields"
      :data-source="collection"
      :current-page="pagination.currentPage"
      :total-records="pagination.total"
      :per-page="pagination.perPage"
      :sort-column="sortBy"
      :sort-value="sortDesc"
      :is-loading="isLoading"
    >
      <template v-slot:test1="data">
        <h1>{{data.item.title}}</h1>
      </template>
    </StandardTable>
  </div>
</template>

<script>
import Banner from '@/models/Banner'
import Search from './Search'
import StandardTable from '@/components/StandardTable'
import { PER_PAGE } from '@/config'

export default {
  name: 'Index',
  components: {
    Search,
    StandardTable
  },
  async beforeRouteEnter (to, from, next) {
    const resp = await Banner.paginate({
      query: {
        page: 1,
        perPage: PER_PAGE,
        'fields[banners]': 'thumbnail,title,publish_start_datetime,publish_end_datetime,is_active,updated_at',
        'sortBy[updated_at]': 'desc'
      }
    })
    to.meta['collection'] = resp.data
    to.meta['pagination'] = resp.pagination
    return next()
  },
  data () {
    return {
      isLoading: false,
      fields: [
        { key: 'thumbnail', label: '' },
        { key: 'title', label: 'Title', sortable: true },
        { key: 'duration', label: 'Duration' },
        { key: 'is_active', label: 'Status', sortable: true },
        { key: 'updated_at', label: 'Updated', sortable: true },
        { key: 'actions', label: '' }
      ],
      collection: [],
      pagination: {},
      filter: {},
      sortBy: 'updated_at',
      sortDesc: 'desc'
    }
  },
  created () {
    this.collection = this.$route.meta['collection']
    this.pagination = this.$route.meta['pagination']
  },
  methods: {
    async onSortChange () {
      this.pagination.currentPage = 1
      await this.fetchList()
    },
    async onPageChanged ({ currentPage, perPage }) {
      this.pagination.currentPage = currentPage
      this.pagination.perPage = perPage
      await this.fetchList()
    },
    async onFilterChange ($event) {
      this.pagination.currentPage = 1
      this.filter = { ...$event }
      await this.fetchList()
    },
    async fetchList () {
      this.isLoading = true
      const sortBy = `sortBy[${this.sortBy || 'updated_at'}]`
      const sortDesc = this.sortDesc ? 'desc' : 'asc'
      const filter = {}
      for (let property in this.filter) {
        filter[`filter[${property}]`] = this.filter[property]
      }

      try {
        const resp = await Banner.paginate({
          query: {
            page: this.pagination.currentPage,
            perPage: this.pagination.perPage,
            'fields[banners]': 'thumbnail,title,publish_start_datetime,publish_end_datetime,is_active,updated_at',
            [sortBy]: sortDesc,
            ...filter
          }
        })
        this.collection = resp.data
        this.pagination = resp.pagination
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
