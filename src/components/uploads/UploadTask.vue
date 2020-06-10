<template>
  <div class="list-group-item">
    <div class="row row-sm align-items-center">
      <div class="col-auto">
        <img :alt="file.name" class="avatar" v-lazy="file.dataURL">
      </div>
      <div class="col">{{ file.name }}</div>
      <div class="col">
        <a-progress :percent="uploadPercentage" :status="status"/>
      </div>
      <div class="col-auto">{{ file.size | formatBytes }}</div>
      <div class="col-auto">
        <div class="btn-list">
          <button class="btn btn-sm btn-primary" @click="handleFileUpload">
            <upload-icon class="icon"/>Upload
          </button>
          <button
            class="btn btn-sm btn-danger"
            @click="$emit('onFileRemove', file)"
          >
            <delete-icon class="icon"/>Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DeleteIcon, UploadIcon } from 'vue-feather-icons'
import { Progress } from 'ant-design-vue'
import File from '@/models/File'

export default {
  name: 'UploadTask',
  inheritAttrs: false,
  props: {
    index: { type: Number, required: true },
    file: { required: true }
  },
  components: { UploadIcon, DeleteIcon, Progress },
  data () {
    return {
      uploadPercentage: 0,
      status: 'active',
      isUploaded: false,
      isRetry: false
    }
  },

  methods: {
    async handleFileUpload () {
      this.isRetry = false
      try {
        await this.upload(this.file)
        this.isUploaded = true
        this.$emit('onSuccess', this.index)
      } catch (error) {
        if (error) {
          this.uploadPercentage = 0
          this.isRetry = true
          this.status = 'exception'
          this.$emit('onError', this.file)
        }
      }
    },

    async upload () {
      const formData = new FormData()
      formData.append('files[]', this.file)
      return File.upload(formData, (progressEvent) => {
        this.uploadPercentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)
      })
    }
  }
}
</script>

<style scoped>

</style>
