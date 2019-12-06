const cors = require('cors')
const bodyParser = require('body-parser')
const authMiddleware = require('./auth')

module.exports = app => {
  app.set('port', process.env.PORT || 3000)

  app.use(cors())
  app.use(authMiddleware)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}
