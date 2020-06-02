import Model from './Model.js'

export default class Banner extends Model {
  static async profile () {
    return (new this()).request({ method: 'GET', url: `admin/profile`, isStatic: true })
  }

  static async login ({ login_id, login_password }) {
    const data = { login_id, login_password }
    return (new this()).request({ method: 'POST', url: `admin/login`, data, isStatic: true })
  }

  static async logout () {
    return (new this()).request({ method: 'DELETE', url: `admin/logout`, isStatic: true })
  }

  buildUrl ({ params }) {
    return ['admins', ...params]
  }

  afterRequest (response, request) {
    if (request.action === 'custom') {
      return response.data.data
    }
    return request.isStatic ? this.make(response.data.data) : this.fill(response.data.data)
  }
}
