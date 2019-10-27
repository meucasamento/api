import { Router } from 'express'

import auth from '../../middlewares/v1/auth.middleware.v1'

import RepositoryFactoryInterface from '../../factories/v1/repository.factory.interface.v1'

import SessionController from '../../controllers/v1/session.controller.v1'
import DashboardController from './../../controllers/v1/dashboard.controller.v1'
import UserController from '../../controllers/v1/user.controller.v1'
import GuestController from '../../controllers/v1/guest.controller.v1'

import GuestValidator from './../../validators/v1/guestRequest.validator.v1'

class Routes {
    routes: Router

    private sessionController: SessionController
    private dashboardController: DashboardController
    private userController: UserController
    private guestController: GuestController

    private guestValidator: GuestValidator

    constructor (repositoryFactory: RepositoryFactoryInterface) {
      this.sessionController = new SessionController(repositoryFactory.userRepository)
      this.dashboardController = new DashboardController(repositoryFactory.dashboardRepository)
      this.userController = new UserController(repositoryFactory.userRepository)
      this.guestController = new GuestController(repositoryFactory.guestRepository)

      this.guestValidator = new GuestValidator(repositoryFactory.guestRepository)

      this.routes = Router()
      this.setup()
    }

    private setup (): void {
      // Session
      this.routes.post('/session/authentication', this.sessionController.authentication)
      this.routes.patch('/session/reset_password', this.sessionController.resetPassword)

      // Dashboard
      this.routes.get('/dashboard/report', auth.checkToken, this.dashboardController.report)

      // Users
      this.routes.get('/users', auth.checkToken, this.userController.index)
      this.routes.get('/users/:id', auth.checkToken, this.userController.findOne)
      this.routes.patch('/users', auth.checkToken, this.userController.update)
      this.routes.patch('/users/change_password', auth.checkToken, this.userController.changePassword)

      // Guests
      this.routes.get('/guests', auth.checkToken, this.guestController.index)
      this.routes.get('/guests/:id', auth.checkToken, this.guestController.findOne)
      this.routes.post('/guests', auth.checkToken, this.guestValidator.store, this.guestController.store)
      this.routes.patch('/guests/:id', auth.checkToken, this.guestController.update)
      this.routes.patch('/guests/:id/confirm', auth.checkToken, this.guestController.confirm)
      this.routes.delete('/guests/:id', auth.checkToken, this.guestController.delete)
    }
}

export default Routes
