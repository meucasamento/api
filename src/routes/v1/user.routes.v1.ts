import UserRepositoryInterface from '../../repositories/users/userRepository.interface'
import UserController from '../../controllers/v1/user.controller.v1'
import auth from '../../middlewares/v1/auth.middleware.v1'
import { Router } from 'express'

class UserRoutes {
    readonly router = Router()
    private controller: UserController

    constructor (repository: UserRepositoryInterface) {
      this.controller = new UserController(repository)
      this.setup()
    }

    private setup = (): void => {
      this.router.use('/users', auth.checkToken)
      this.router.get('/users', this.controller.index)
      this.router.get('/users/:id', this.controller.findOne)
      this.router.patch('/users', this.controller.update)
      this.router.patch('/users/change_password', this.controller.changePassword)
    }
}

export default UserRoutes
