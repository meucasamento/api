import Mailgun from 'mailgun-js'
import MailServiceInterface from './mail.service.interface'
import Config from '../../../config/env'

class MailgunService implements MailServiceInterface {
  async send (email: string, subject?: string, body?: string): Promise<void> {
    const mailgun = new Mailgun({
      apiKey: Config.mailgunApiKey,
      domain: Config.mailgunDomain
    })
    try {
      await mailgun.messages().send({
        from: 'adrianosouzacostaios@gmail.com',
        to: email,
        subject: subject,
        html: body
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default new MailgunService()
