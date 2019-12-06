const express = require('express')
const routes = require('../routes/routes')
const middlewares = require('./middleware')

module.exports = () => {
  const app = express()
  
  middlewares(app)
  routes(app)
  
  return app
}