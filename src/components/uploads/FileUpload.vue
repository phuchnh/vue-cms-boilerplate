<template>
  <div id="FileUpload">
    <form class="dropzone shadow"
      :class="{'border-success': isDropped }"
      @drop.prevent="addFile($event)"
      @dragend.prevent="isDropped = false"
      @dragover.prevent="isDropped = true"
      @dragleave.prevent="isDropped = false"
    >
      <div class="d-flex flex-column justify-content-center align-items-center message">
        <upload-icon size="4x"/>
        <div class="text-muted">
          <span class="btn btn-secondary btn-file">
            <file-icon class="icon"/> Browse
            <input type="file" multiple @change="addFile($event)" ref="fileInput"/>
          </span> or drag file to this area to upload
        </div>
      </div>
    </form>
    <div class="card card-sm mt-4" v-if="fileUploads.length">
      <div class="card-body p-0">
        <div class="row align-items-center p-3">
          <div class="col-auto">
            <h3 class="card-title">Upload Process</h3>
          </div>
          <div class="col-auto ml-auto" v-if="fileUploads.length > 1">
            <div class="btn-list">
              <button class="btn btn-sm btn-primary" @click="uploadAll">
                <upload-icon class="icon"/>Upload All
              </button>
              <button class="btn btn-sm btn-danger" @click="removeAll">
                <delete-icon class="icon"/>Remove All
              </button>
            </div>
          </div>
        </div>
        <div class="list list-row">
          <UploadTask
            ref="uploadTasks"
            v-for="(file, index) in fileUploads"
            :index="index"
            :file="file"
            :key="file.uid"
            @onUploadSuccess="onUploadSuccess($event)"
            @onRemove="removeFile($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DeleteIcon, FileIcon, UploadIcon } from 'vue-feather-icons'
import UploadTask from './UploadTask'
import uniqueId from 'lodash-es/uniqueId'

export default {
  name: 'FileUpload',
  components: {
    FileIcon,
    UploadIcon,
    DeleteIcon,
    UploadTask
  },
  props: {
    limit: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      isDropped: false,
      fileUploads: []
    }
  },
  methods: {
    resetInputFile () {
      const input = this.$refs.fileInput
      input.type = 'text'
      input.type = 'file'
      this.fileUploads = []
      this.isDropped = false
    },
    removeAll () {
      this.resetInputFile()
    },
    async uploadAll () {
      let promises = []
      for (let index = 0; index < this.$refs.uploadTasks.length; index++) {
        promises.push(this.$refs.uploadTasks[index].handleFileUpload())
      }
      await Promise.all([...promises])
      this.resetInputFile()
      this.$emit('onUploaded')
    },
    async getDataUrl (file) {
      const reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    onUploadSuccess (index) {
      this.removeFile(index)
      if (!this.fileUploads.length) {
        this.resetInputFile()
        this.$emit('onUploaded')
      }
    },
    removeFile (index) {
      this.fileUploads.splice(index, 1)
      if (!this.fileUploads.length) {
        this.resetInputFile()
      }
    },
    async addFile (evt) {
      this.isDropped = true
      let droppedFiles = evt.target.files || evt.dataTransfer.files
      if (!droppedFiles.length) return
      droppedFiles = [...droppedFiles]
        .slice(0, this.limit) // Limit file to upload
        .filter(file => {
          const regExp = /^image\/(jpe?g|png)$/g
          return regExp.test(file.type)
        })
      for (let file of droppedFiles) {
        file = Object.assign(file, {
          uid: uniqueId('fileUpload_'),
          dataURL: await this.getDataUrl(file)
        })
        this.fileUploads.push(file)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .dropzone {
    position: relative;
    border: 2px dashed #a8aeb7;
    border-radius: 8px;
    background: transparent;
    padding: 48px;

    .message {
      font-weight: 500;
      text-transform: uppercase;
    }

    .btn-file {
      position: relative;
      overflow: hidden;
    }

    .btn-file input[type=file] {
      position: absolute;
      top: 0;
      right: 0;
      min-width: 100%;
      min-height: 100%;
      font-size: 100px;
      text-align: right;
      filter: alpha(opacity=0);
      opacity: 0;
      outline: none;
      background: #ffffff;
      cursor: inherit;
      display: block;
    }
  }
</style>
