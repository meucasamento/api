import UserRepositoryInterface from '../../repositories/users/userRepository.interface'
import SessionController from '../../controllers/v1/session.controller.v1'
import { Router } from 'express'

class SessionRoutes {
    readonly router = Router()
    private controller: SessionController

    constructor (repository: UserRepositoryInterface) {
      this.controller = new SessionController(repository)
      this.setup()
    }

    private setup = (): void => {
      this.router.post('/session/authentication', this.controller.authentication)
      this.router.patch('/session/reset_password', this.controller.resetPassword)
      this.router.post('/session/register', this.controller.register)
    }
}

export default SessionRoutes
