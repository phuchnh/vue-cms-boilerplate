<template>
  <div id="BannerIndex">
    <div class="btn-list">
      <router-link :to="{name: 'banners.create'}" class="btn btn-success" tag="button">
        Create New Banner
      </router-link>
    </div>
    <Search
      :filter.sync="filter"
      :page.sync="pagination.currentPage"
      @onSearch="fetchCollection"
    >
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
Vue.prototype.$model = Banner // Important! Override current model

export default {
  name: 'Index',
  extends: StandardList,
  components: {
    StandardTable,
    Search
  }
}
</script>

<style scoped>

</style>
