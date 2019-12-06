const UserModel = require('../database/models/user.model')
const HttpResponse = require('../helpers/http-response')
const bcrypt = require('bcryptjs')

class AuthRepository {
  async auth (email, password) {
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) return HttpResponse.forbiden(user, 'User not found')

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) return HttpResponse.forbiden(null, 'Invalid password')
    
    return HttpResponse.success(user)
  }

  async register (name, email, password) {
    const checkExists = await UserModel.findOne({ email });
    
    if (!checkExists) return HttpResponse.forbiden(null, 'User already exists')

    const user = await UserModel.create({ name, email, password })
    return HttpResponse.success(user)
  }
}

module.exports = new AuthRepository()