import RouterInterface from './../router.interface'
import UserRepositoryInterface from './../../repositories/users/userRepository.interface'
import SessionController from './../../controllers/v1/session.controller.v1'
import SessionValidator from './../../validators/v1/session.validator.v1'
import MailServiceInterface from './../../utils/components/mail/mail.service.interface'

class SessionRouter extends RouterInterface {
    private controller: SessionController
    private validator: SessionValidator

    constructor (repository: UserRepositoryInterface,
      mailService: MailServiceInterface) {
      super()
      this.controller = new SessionController(repository, mailService)
      this.validator = new SessionValidator(repository)
      this.setup()
    }

    private setup = (): void => {
      this.router.post('/session/authentication', this.validator.authentication, this.validator.validate, this.controller.authentication)
      this.router.post('/session/reset_password', this.validator.resetPassword, this.validator.validate, this.controller.resetPassword)
      this.router.post('/session/register', this.validator.register, this.validator.validate, this.controller.register)
    }
}

export default SessionRouter
