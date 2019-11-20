import MailServiceInterface from '../../utils/components/mail/mail.service.interface'

class MailServiceMock implements MailServiceInterface {
  send (email: string, subject?: string, body?: string): Promise<void> {
    return Promise.resolve()
  }
}

export default new MailServiceMock()
