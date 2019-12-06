const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

class JwtHelper {
  generateToken (id) {
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: 86400 // one day
    })

    return token
  }

  isValid(token) {
    return true
  }
}

module.exports = new JwtHelper()