import Model from './Model.js'

export default class File extends Model {
  // Only fetch needed column to show in table
  static displayFields = [
    'id',
    'name',
    'mime_type',
    'size',
    'url',
    'updated_at'
  ]

  static async upload (formData, callback) {
    const config = {
      onUploadProgress: (progressEvent) => callback(progressEvent)
    }
    const method = 'POST'
    const url = 'files/upload'
    const data = formData
    return (new this()).request({ method, url, data, isStatic: true, config })
  }
}
