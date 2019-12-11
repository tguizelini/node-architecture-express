const db = require('../../database/db')
const UserSchema = require('../../database/schemas/user.schema')

module.exports = db.model('User', UserSchema)
