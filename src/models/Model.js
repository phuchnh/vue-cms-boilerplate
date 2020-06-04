// noinspection ES6CheckImport
import { Model as BaseModel } from 'javel'
import axios from '@/plugins/axios'
import { PER_PAGE } from '@/config'
import { serialize } from '@/utils'

export default class Model extends BaseModel {
  baseUrl () {
    return '/api'
  }

  makeRequest ({ method, url, data, query }) {
    return axios({ method, url, data, params: query })
  }

  static customPaginate (options = {}, configs = {}) {
    const page = options.page || 1
    const perPage = options.perPage || PER_PAGE
    const sortColumn = options.sortColumn || 'updated_at'
    const sortDirection = options.sortDirection || 'desc'
    const fields = options.fields || {}
    const query = serialize({ page, perPage, sortBy: { [sortColumn]: sortDirection }, fields })
    return (new this()).request({ method: 'GET', isStatic: true, query, ...configs })
  }
}
