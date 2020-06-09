import Model from './Model.js'

export default class Banner extends Model {
  // Only fetch needed column to show in table
  static displayFields = [
    'id',
    'thumbnail',
    'title',
    'is_active',
    'updated_at',
    'publish_start_datetime',
    'publish_end_datetime'
  ]
}
