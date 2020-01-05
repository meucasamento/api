import RouterInterface from '../router.interface'
import UserRepositoryInterface from '../../repositories/users/userRepository.interface'
import UserController from '../../controllers/v1/user.controller.v1'
import Auth from '../../middlewares/v1/auth.middleware.v1'
import UserValidator from './../../validators/v1/user.validator.v1'

class UserRoutes extends RouterInterface {
    private controller: UserController
    private validator: UserValidator

    constructor (repository: UserRepositoryInterface) {
      super()
      this.controller = new UserController(repository)
      this.validator = new UserValidator(repository)
      this.setup()
    }

    private setup = (): void => {
      this.router.use('/users', Auth.checkToken)
      this.router.get('/users', this.controller.index)
      this.router.get('/users/:id', this.validator.findOne, this.validator.validate, this.controller.findOne)
      this.router.patch('/users', this.validator.update, this.validator.validate, this.controller.update)
      this.router.patch('/users/change_password', this.validator.changePassword, this.validator.validate, this.controller.changePassword)
    }
}

export default UserRoutes
