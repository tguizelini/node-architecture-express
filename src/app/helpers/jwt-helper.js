const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

class JwtHelper {
  generateToken (id) {
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: 86400 // one day
    })

    return token
  }

  isValid (token) {
    const validation = jwt.verify(token, authConfig.secret, (err, decode) => {
      if (err) return { isValid: false }
      return {
        isValid: true,
        userId: decode.id
      }
    })

    return validation
  }
}

module.exports = new JwtHelper()
