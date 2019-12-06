const HttpResponse = require('../app/helpers/http-response')
const JwtHelper = require('../app/helpers/jwt-helper')

module.exports = (req, res, next) => {
  let response = null
  const { originalUrl } = req
  const { authorization } = req.headers

  if (originalUrl.includes('auth')) return next()

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

  req.userId = tokenValidation.userId

  next()
}
