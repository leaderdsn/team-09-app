const { request } = require('./utils')

class AuthAPI {

  signin(req, res) {
    request(req, res, 'POST', '/auth/signin')
  }

  logout(req, res) {
    request(req, res, 'POST', '/auth/logout')
  }

  fetchUser(req, res) {
    request(req, res, 'GET', '/auth/user')
  }

  getServiceId(req, res) {
    request(req, res, 'GET', '/oauth/yandex/service-id?redirect_uri=http://siberia-agario-19.ya-praktikum.tech:3000/oauth')
  }

  signinOauth(req, res) {
    request(req, res, 'POST', '/oauth/yandex')
  }
}

const authAPI = new AuthAPI()

module.exports = { authAPI }
