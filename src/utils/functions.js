import { PER_PAGE } from '@/config'

export const serialize = (obj, prefix) => {
  const params = {}
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p
      const v = obj[p]
      Object.assign(params, v !== null && typeof v === 'object' ? serialize(v, k) : { [k]: v })
    }
  }
  return params
}

export const fetchCollection = async (model, options = {}) => {
  const page = options.page || 1
  const perPage = options.perPage || PER_PAGE
  const sortColumn = options.sortColumn || 'updated_at'
  const sortDirection = options.sortDirection || 'desc'
  const fields = options.fields || {}
  const query = serialize({
    page,
    perPage,
    sortBy: { [sortColumn]: sortDirection },
    fields
  })
  return model.paginate({ query })
}
