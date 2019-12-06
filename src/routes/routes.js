const router = require('express').Router()

const authRoutes = require('./auth.route')

module.exports = app => {
  router.use('/auth', authRoutes)
 
  app.use('/api', router)
}