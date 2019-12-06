const mailConfig = {
  host: 'smtp.domain.email',
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: 'my_user',
    pass: 'my_password'
  }
}

module.exports = mailConfig
