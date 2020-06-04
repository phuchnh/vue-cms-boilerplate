<template>
  <div id="BannerIndex">
    <div class="btn-list">
      <router-link :to="{name: 'banners.create'}" class="btn btn-success" tag="button">
        Create New Banner
      </router-link>
    </div>
    <Search/>
    <StandardTable
      :data-source="collection"
      :loading="isLoading"
      :total="pagination.total"
      :sort-column.sync="sorter.sortColumn"
      :sort-direction.sync="sorter.sortDirection"
      :current-page.sync="pagination.currentPage"
      :per-page.sync="pagination.perPage"
      @change="fetchList"
    >
      <a-table-column key="thumbnail" title="Image">
        <template slot-scope="record">
          <div class="d-flex justify-content-center align-items-center">
            <img
              v-lazy="record.thumbnail.url"
              :alt="record.title"
              class="rounded rounded-md"
              :width="100"
              :height="100"
            >
          </div>
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
      <a-table-column key="is_active" title="Status" :sorter="true">
        <template slot-scope="record">
          <i>{{record.is_active}}</i>
        </template>
      </a-table-column>
      <a-table-column key="updated_at" title="Updated" :sorter="true">
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

export default {
  name: 'Index',
  components: {
    Search,
    StandardTable
  },
  async beforeRouteEnter (to, from, next) {
    const resp = await Banner.customPaginate()
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
    async fetchList () {
      this.isLoading = true
      try {
        const resp = await Banner.customPaginate({
          page: this.pagination.currentPage,
          perPage: this.pagination.perPage,
          sortColumn: this.sorter.sortColumn,
          sortDirection: this.sorter.sortDirection
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
