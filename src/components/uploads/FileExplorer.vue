<template>
  <div id="FileExplorer">
    <div class="row p-4">
      <div class="col-12">
        <div class="d-flex justify-content-center align-items-center p-3">
          <a-pagination ref="pagination"
            v-model="pagination.currentPage"
            :defaultPageSize="15"
            :total.sync="pagination.total"
            @change="handlePageChange($event)"
          />
        </div>
      </div>
      <div class="col-sm-4 col-md-3"
        v-for="(file, index) in collection"
        :key="index"
        @click="selectFile(file)"
      >
        <div class="card" :class="isSelected(file)">
          <div class="d-block">
            <img v-lazy="file.url" class="card-img-top object-cover" :alt="file.name" :height="150">
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="d-flex justify-content-center align-items-center p-3">
          <a-pagination ref="pagination"
            v-model="pagination.currentPage"
            :defaultPageSize="15"
            :total.sync="pagination.total"
            @change="handlePageChange($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import File from '@/models/File'

export default {
  name: 'FileExplorer',
  data () {
    return {
      selectedItem: null,
      collection: [],
      pagination: {}
    }
  },
  computed: {},
  methods: {
    async handlePageChange (page) {
      await this.refresh({ page })
    },
    selectFile (file) {
      this.selectedItem = file
    },
    async refresh (options = {}) {
      this.loading = true
      const query = File.queryBuilder({
        ...options,
        perPage: 12,
        fields: { files: File.displayFields.join(',') }
      })
      try {
        const resp = await File.paginate({ query })
        this.collection = resp.data
        this.pagination = resp.pagination
      } catch (e) {}
    },
    isSelected: (item) => {
      if (!this.selectedItem) {
        return
      }
      return {
        'card-active': this.selectedItem.id === item.id
      }
    }
  },
  async mounted () {
    await this.refresh()
  }
}
</script>

<style scoped lang="scss">
  #FileExplorer {
    .ant-tabs-nav-container {
      padding: 0 !important;
    }
  }
</style>
