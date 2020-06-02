import Model from './Model.js'

export default class Banner extends Model {
  buildUrl (request) {
    const { params } = request
    return ['banners', ...params]
  }
}
