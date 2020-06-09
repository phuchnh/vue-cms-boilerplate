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
}
