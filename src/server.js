const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json('API running')
})

routes(app)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})