<template>
  <div class="SelectFileButton">
    <button class="btn btn-secondary" @click="display = true">
      <image-icon class="icon"/> Browse
    </button>
    <b-modal :display.sync="display">
      <a-tabs type="card" ref="tabs" v-model="activeKey">
        <a-tab-pane :key="1" tab="Upload">
          <div class="p-3">
            <FileUpload @onUploaded="onUploaded"/>
          </div>
        </a-tab-pane>
        <a-tab-pane :key="2" tab="File" force-render>
          <FileExplorer ref="fileExplorer"/>
        </a-tab-pane>
      </a-tabs>
      <template slot="footer">
        <button type="button" class="btn btn-link link-secondary mr-auto" @click="display = false">Close</button>
        <button type="button" class="btn btn-danger" @click="display = false">Save</button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { ImageIcon, XCircleIcon } from 'vue-feather-icons'
import FileExplorer from '@/components/uploads/FileExplorer'
import FileUpload from '@/components/uploads/FileUpload'

export default {
  name: 'SelectFileButton',
  components: {
    FileUpload,
    FileExplorer,
    XCircleIcon,
    ImageIcon
  },
  data () {
    return {
      display: false,
      activeKey: 1
    }
  },
  methods: {
    async onUploaded () {
      this.activeKey = 2
      await this.$refs.fileExplorer.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
  .ant-tabs-nav-container {
    padding: 0 !important;
  }
  .SelectFileButton {
    .ant-tabs-card {
      > .ant-tabs-content {
        > .ant-tabs-tabpane {
          margin-top: -8px;
          background: #ffffff;
        }
      }
    }
  }
</style>
