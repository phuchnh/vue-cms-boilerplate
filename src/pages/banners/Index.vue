<template>
  <div id="BannerIndex">
    <div class="btn-list">
      <router-link :to="{name: 'banners.create'}" class="btn btn-success" tag="button">
        Create New Banner
      </router-link>
    </div>
    <Search @filter-changed="onFilterChange($event)"/>
    <StandardTable :data-source="collection" :loading="isLoading">
      <a-table-column key="thumbnail" title="Image">
        <template slot-scope="record">
          <img v-lazy="record.thumbnail.url" :alt="record.title" class="rounded" :width="100" :height="100">
        </template>
      </a-table-column>
      <a-table-column key="title" title="Title" :sorter="true">
        <template slot-scope="record">
          <b>{{record.title}}</b>
        </template>
      </a-table-column>
      <a-table-column key="duration" title="Duration">
        <template slot-scope="record">
          <div class="row row-sm align-items-center" style="width: 300px">
            <div class="col">{{record.publish_start_datetime}}</div>
            <div class="col-auto">~</div>
            <div class="col">{{record.publish_end_datetime}}</div>
          </div>
        </template>
      </a-table-column>
      <a-table-column key="status" title="Status" :sorter="true">
        <template slot-scope="record">
          <i>{{record.is_active}}</i>
        </template>
      </a-table-column>
      <a-table-column key="updated" title="Updated" :sorter="true">
        <template slot-scope="record">
          <i>{{record.updated_at | formatDate('LLL')}}</i>
        </template>
      </a-table-column>
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
        'fields[banners]': 'id,thumbnail,title,publish_start_datetime,publish_end_datetime,is_active,updated_at',
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
            'fields[banners]': 'id,thumbnail,title,publish_start_datetime,publish_end_datetime,is_active,updated_at',
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
