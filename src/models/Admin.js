import Model from './Model.js'

export default class Banner extends Model {
  static async profile () {
    const resp = await (new this()).request({ method: 'GET', url: `admin/profile`, isStatic: true })
    return resp.data
  }

  static async login ({ login_id, login_password }) {
    const credentials = { login_id, login_password }
    const resp = await (new this()).request({
      method: 'POST',
      url: `admin/login`,
      data: credentials,
      isStatic: true
    })
    return resp.data
  }

  static async logout () {
    return (new this()).request({
      method: 'DELETE',
      url: `admin/logout`,
      isStatic: true
    })
  }

  buildUrl ({ params }) {
    return ['admins', ...params]
  }
}
