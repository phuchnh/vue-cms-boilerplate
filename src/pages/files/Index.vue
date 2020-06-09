<template>
  <div id="FileIndex">
    <div class="btn-list">
      <router-link :to="{name: 'files.upload'}" class="btn btn-success" tag="button">
        Upload File
      </router-link>
    </div>
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
              v-lazy="record.url"
              :alt="record.name"
              class="avatar avatar-lg"
            >
          </div>
        </template>
      </a-table-column>
      <a-table-column key="title" title="Title" :sorter="true">
        <template slot-scope="record">
          <b>{{record.name}}</b>
        </template>
      </a-table-column>
      <a-table-column key="size" title="Size" :sorter="true">
        <template slot-scope="record">
          <i>{{record.size | formatBytes}}</i>
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
import Vue from 'vue'
import File from '@/models/File'
import StandardTable from '@/components/StandardTable'
import StandardList from '@/components/StandardList'

export default {
  name: 'Index',
  extends: StandardList,
  components: {
    StandardTable
  },
  async beforeRouteEnter (to, from, next) {
    // !Important. See in StandardList#fetchCollection
    Vue.prototype.$model = File

    // Fetch needed data before component render
    const resp = await File.paginate({
      query: File.queryBuilder({
        fields: { files: File.displayFields.join(',') }
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
