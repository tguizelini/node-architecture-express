const AuthRepository = require('../repositories/auth.repository')
const HttpResponse = require('../helpers/http-response')
const bcrypt = require('bcryptjs')
const JwtHelper = require('../helpers/jwt-helper')

class AuthService {
  async auth (email, password) {
    const user = await AuthRepository.findOne({ email }).select('+password')

    if (!user) return HttpResponse.forbiden(user, 'User not found')

    const passwordCorrect = await bcrypt.compare(password, user.password)
    user.password = undefined

    if (!passwordCorrect) return HttpResponse.forbiden(null, 'Invalid password')

    const token = JwtHelper.generateToken(user.id)

    return HttpResponse.success({ user, token })
  }

  async register (name, email, password) {
    const checkExists = await AuthRepository.findOne({ email })

    if (checkExists) return HttpResponse.forbiden(null, 'User already exists')

    const user = await AuthRepository.create({ name, email, password })
    user.password = undefined

    const token = JwtHelper.generateToken(user.id)

    return HttpResponse.success({ user, token })
  }
}

module.exports = new AuthService()
