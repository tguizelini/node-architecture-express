const mongoose = require('../db')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'users' })

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
