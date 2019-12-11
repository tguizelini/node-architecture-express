const AuthService = require('../services/auth.service')
const HttpResponse = require('../helpers/http-response')

class AuthController {
  async auth (req, res) {
    try {
      const { login, password } = req.body
      const response = await AuthService.auth(login, password)
      res.status(response.status).json(response)
    } catch (error) {
      const response = HttpResponse.serverError(error, 'Error on authenticate new user')
      res.status(response.status).json(response)
    }
  }

  async register (req, res) {
    try {
      const { name, login, password } = req.body
      const response = await AuthService.register(name, login, password)
      res.status(response.status).json(response)
    } catch (error) {
      const response = HttpResponse.serverError(error, 'Error on register new user')
      res.status(response.status).json(response)
    }
  }
}

module.exports = new AuthController()
