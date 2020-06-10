<template>
  <div id="BannerIndex">
    <div class="d-flex justify-content-between align-items-center">
      <div class="btn-list">
        <button class="btn btn-secondary btn-icon" @click="isSearch = !isSearch">
          <search-icon class="icon"></search-icon>
        </button>
      </div>
      <router-link :to="{name: 'banners.create'}" class="btn btn-secondary" tag="button">
        Create New Banner
      </router-link>
    </div>
    <Search :filter.sync="filter" :page.sync="pagination.currentPage" @onSearch="fetchCollection" v-show="isSearch">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input type="text" class="form-control" v-model.trim="filter.title">
      </div>
      <div class="mb-3">
        <label class="form-label">Status</label>
        <input type="text" class="form-control" v-model.trim="filter.status">
      </div>
    </Search>
    <StandardTable
      :data-source="collection"
      :loading="loading"
      :total="pagination.total"
      :sort-column.sync="sorter.sortColumn"
      :sort-direction.sync="sorter.sortDirection"
      :current-page.sync="pagination.currentPage"
      :per-page.sync="pagination.perPage"
      @change="fetchCollection"
    >
      <a-table-column key="thumbnail" title="Thumbnail" align="center">
        <template slot-scope="record">
          <div class="d-flex justify-content-center align-items-center">
            <img
              v-lazy="record.thumbnail.url"
              :alt="record.title"
              class="avatar avatar-lg"
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
      <a-table-column key="action">
        <template slot-scope="record">
          <router-link :to="{name: 'banners.edit', params: {id: record.id}}" class="btn btn-success" tag="button">
            Edit
          </router-link>
        </template>
      </a-table-column>
    </StandardTable>
  </div>
</template>

<script>
import Vue from 'vue'
import Banner from '@/models/Banner'
import Search from '@/components/Search'
import StandardTable from '@/components/StandardTable'
import StandardList from '@/components/StandardList'
import { SearchIcon } from 'vue-feather-icons'

export default {
  name: 'Index',
  extends: StandardList,
  components: {
    StandardTable,
    Search,
    SearchIcon
  },
  data () {
    return {
      isSearch: false
    }
  },
  async beforeRouteEnter (to, from, next) {
    // !Important. See in StandardList#fetchCollection
    Vue.prototype.$model = Banner

    // Fetch needed data before component render
    const resp = await Banner.paginate({
      query: Banner.queryBuilder({
        fields: { banners: Banner.displayFields.join(',') }
      })
    })

    // Shared data via route meta
    to.meta.collection = resp.data
    to.meta.pagination = resp.pagination

    // Your custom logic
    return next()
  },
  created () {
    // Receive data via route meta
    this.collection = this.$route.meta.collection
    this.pagination = this.$route.meta.pagination

    // Your custom logic
  }
}
</script>

<style scoped>

</style>
