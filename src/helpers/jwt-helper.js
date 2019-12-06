const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

class JwtHelper {
  static generateToken (id) {
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: 86400 // one day
    })

    return token
  }
}

module.exports = JwtHelper