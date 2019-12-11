const express = require('express')
const routes = require('../app/routes/routes')
const middlewares = require('../middlewares/middlewares')

const app = express()

middlewares(app)
routes(app)

module.exports = app
