const UserModel = require('../database/models/user.model')
const HttpResponse = require('../helpers/http-response')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

class AuthRepository {
  async auth (email, password) {
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) return HttpResponse.forbiden(user, 'User not found')

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) return HttpResponse.forbiden(null, 'Invalid password')

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400 // one day
    })
    
    return HttpResponse.success({ user, token })
  }

  async register (name, email, password) {
    const checkExists = await UserModel.findOne({ email });
    
    if (!checkExists) return HttpResponse.forbiden(null, 'User already exists')

    const user = await UserModel.create({ name, email, password })
    return HttpResponse.success(user)
  }
}

module.exports = new AuthRepository()