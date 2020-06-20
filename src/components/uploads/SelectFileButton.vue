<template>
  <div class="SelectFileButton">
    <button class="btn btn-secondary" @click="display = true">
      <image-icon class="icon"/>
      Browse
    </button>
    <b-modal :display.sync="display">
      <div class="tabs-wrapper">
        <a-tabs type="card" ref="tabs" v-model="activeKey">
          <a-tab-pane :key="1" tab="Upload">
            <FileUpload @onUploaded="onUploaded"/>
          </a-tab-pane>
          <a-tab-pane :key="2" tab="File" force-render>
            <FileExplorer ref="fileExplorer"/>
          </a-tab-pane>
        </a-tabs>
      </div>
      <template slot="footer">
        <button type="button" class="btn btn-primary" @click="display = false">Close</button>
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
  .SelectFileButton {
    .tabs-wrapper {
      overflow: hidden;

      .ant-tabs-tabpane-active {
        margin-top: -16px;
        padding: 16px;
        border: 1px solid #e8e8e8;
        border-top: none;
        background: #fff;
      }
    }
  }
</style>
