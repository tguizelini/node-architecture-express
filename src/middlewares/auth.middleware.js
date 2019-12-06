const HttpResponse = require('../helpers/http-response')
const JwtHelper = require('../helpers/jwt-helper')

module.exports = (req, res, next) => {
  let response = null
  const { authorization } = req.headers

  if (req.originalUrl.includes('auth')) return next()

  if (!authorization) {
    response = HttpResponse.unauthorizedError(null, 'No token provided')
    return res.status(response.status).json(response)
  }

  const tokenParts = authorization.split(' ')

  if (!tokenParts.length === 2) {
    response = HttpResponse.unauthorizedError(null, 'Token invalid')
    return res.status(response.status).json(response)
  }

  const [scheme, token] = tokenParts

  if (!scheme.includes('Bearer')) {
    response = HttpResponse.unauthorizedError(null, 'Token malformed')
    return res.status(response.status).json(response)
  }

  const tokenValidation = JwtHelper.isValid(token)

  if (!tokenValidation.isValid) {
    response = HttpResponse.unauthorizedError(null, 'Token invalid')
    return res.status(response.status).json(response)
  }

  req.userId = tokenValidation.decode.id

  next()
}
