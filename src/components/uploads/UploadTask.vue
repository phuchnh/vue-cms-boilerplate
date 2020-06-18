<template>
  <div class="list-item">
    <!-- File Preview -->
    <div class="avatar avatar-lg" v-lazy:background-image="file.dataURL"></div>
    <div class="text-truncate w-50">
      <!-- File Name -->
      <b class="text-body d-block">{{ file.name }}</b>
      <!-- File Size -->
      <i class="mt-n1">{{ file.size | formatBytes }}</i>
      <!-- File Progress -->
      <div class="d-block mt-n1">
        <a-progress :percent="uploadPercentage" :stroke-color="strokeColor"/>
      </div>
    </div>
    <!-- File Actions -->
    <div class="list-item-actions show">
      <div class="btn-list">
        <button class="btn btn-sm btn-primary" @click="handleFileUpload" :disabled="isUploading">
          <upload-icon class="icon"/>Upload
        </button>
        <button class="btn btn-sm btn-danger" @click="$emit('onRemove', index)" :disabled="isUploading">
          <delete-icon class="icon"/>Remove
        </button>
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
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068'
      },
      uploadPercentage: 0,
      state: 'active'
    }
  },
  computed: {
    isUploading () {
      return this.state === 'uploading'
    },
    isError () {
      return this.state === 'error'
    }
  },
  methods: {
    async handleFileUpload () {
      this.state = 'uploading'
      try {
        await this.upload(this.file)
        this.isUploaded = true
        this.$emit('onUploadSuccess', this.index)
      } catch (error) {
        this.uploadPercentage = 0
        this.state = 'error'
        this.$emit('onUploadError', this.file)
        throw error
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
