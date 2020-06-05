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

  afterRequest ({ data }, { action, isStatic }) {
    switch (action) {
      case 'custom':
        if (data.hasOwnProperty('pagination')) {
          data.data = this.make(data.data)
          return data
        }
        return data
      case 'paginate':
        data.data = this.make(data.data)
        return data
    }
    return isStatic ? this.make(data.data) : this.fill(data.data)
  }

  static paginateCustom (options = {}) {
    const page = options.page || 1
    const perPage = options.perPage || PER_PAGE
    const sortColumn = options.sortColumn || 'updated_at'
    const sortDirection = options.sortDirection || 'desc'
    const filter = options.filter || {}
    const fields = options.fields || {}
    const query = serialize({ page, perPage, filter, sortBy: { [sortColumn]: sortDirection }, fields })
    return (new this()).request({ method: 'GET', isStatic: true, query })
  }
}
