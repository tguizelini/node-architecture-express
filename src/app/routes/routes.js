const router = require('express').Router()

const authRoutes = require('./auth.routes')

module.exports = app => {
  router.use('/auth', authRoutes)

  app.use('/api', router)
}
