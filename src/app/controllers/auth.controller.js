const AuthRepository = require('../repositories/auth.repository')
const HttpResponse = require('../helpers/http-response')

class AuthController {
  async auth (req, res) {
    try {
      const { email, password } = req.body
      const response = await AuthRepository.auth(email, password)
      res.status(response.status).json(response)
    } catch (error) {
      const response = HttpResponse.serverError(error, 'Error on authenticate new user')
      res.status(response.status).json(response)
    }
  }

  async register (req, res) {
    try {
      const { name, email, password } = req.body
      const response = await AuthRepository.register(name, email, password)
      res.status(response.status).json(response)
    } catch (error) {
      const response = HttpResponse.serverError(error, 'Error on register new user')
      res.status(response.status).json(response)
    }
  }
}

module.exports = new AuthController()
