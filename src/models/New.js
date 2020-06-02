import Model from './Model.js'

export default class New extends Model {
  buildUrl (request) {
    const { params } = request
    return ['news', ...params]
  }
}
