import Model from './Model.js'

export default class Banner extends Model {
  static fields = ['id', 'thumbnail', 'title', 'is_active', 'updated_at', 'publish_start_datetime', 'publish_end_datetime']

  buildUrl (request) {
    const { params } = request
    return ['banners', ...params]
  }
}
