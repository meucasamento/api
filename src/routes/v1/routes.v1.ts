import { Router } from 'express'

import RepositoryFactoryInterface from '../../factories/v1/repository.factory.interface.v1'
import UserRoutes from './user.routes.v1'
import GuestRoutes from './guest.routes.v1'
import DashboardRoutes from './dashboard.routes.v1'
import SessionRoutes from './session.routes.v1'

class Routes {
    readonly router = Router()

    private userRoutes: UserRoutes
    private guestRoutes: GuestRoutes
    private dashboardRoutes: DashboardRoutes
    private sessionRoutes: SessionRoutes

    constructor (repositoryFactory: RepositoryFactoryInterface) {
      this.userRoutes = new UserRoutes(repositoryFactory.userRepository)
      this.guestRoutes = new GuestRoutes(repositoryFactory.guestRepository)
      this.dashboardRoutes = new DashboardRoutes(repositoryFactory.dashboardRepository)
      this.sessionRoutes = new SessionRoutes(repositoryFactory.userRepository)
      this.setup()
    }

    private setup (): void {
      // Session
      this.router.use(this.sessionRoutes.router)

      // Dashboard
      this.router.use(this.dashboardRoutes.router)

      // Users
      this.router.use(this.userRoutes.router)

      // Guests
      this.router.use(this.guestRoutes.router)
    }
}

export default Routes
