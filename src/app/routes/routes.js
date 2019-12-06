const router = require('express').Router()

const authRoutes = require('./auth.route')

module.exports = app => {
  router.get('/', (req, res) => res.json('NodeRest API running'))

  router.use('/auth', authRoutes)

  app.use('/api', router)
}
