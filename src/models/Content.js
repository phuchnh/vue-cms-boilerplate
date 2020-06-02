import Model from './Model.js'

export default class Content extends Model {
  buildUrl (request) {
    const { params } = request
    return ['contents', ...params]
  }
}
