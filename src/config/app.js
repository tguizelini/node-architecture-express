const express = require('express')
const routes = require('../app/routes/routes')
const middlewares = require('../middlewares/middlewares')

module.exports = () => {
  const app = express()

  middlewares(app)
  routes(app)

  return app
}
