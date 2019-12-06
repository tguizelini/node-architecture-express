const mailConfig = require('../../config/mail')
const nodemailer = require('nodemailer')

class MailHelper {
  constructor () {
    this.client = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass
      }
    })
  }

  async sendMail (to, subject, message) {
    await this.client.sendMail({
      from: '"HT7" <ht7.mobile@gmail.com>', // sender address
      to: to,
      subject: subject || 'Subject',
      html: '<p>' + message + '</p>'
    })
  }
}

module.exports = new MailHelper()
