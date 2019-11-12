import RepositoryFactoryInterface from '../../factories/v1/repository.factory.interface.v1'
import RouterInterface from '../router.interface'

import UserRoutes from './user.routes.v1'
import GuestRoutes from './guest.routes.v1'
import DashboardRoutes from './dashboard.routes.v1'
import SessionRoutes from './session.routes.v1'

class RouterV1 extends RouterInterface {
    private routes: RouterInterface[]

    constructor (repositoryFactory: RepositoryFactoryInterface) {
      super()
      this.routes = [
        new UserRoutes(repositoryFactory.userRepository),
        new GuestRoutes(repositoryFactory.guestRepository),
        new DashboardRoutes(repositoryFactory.dashboardRepository),
        new SessionRoutes(repositoryFactory.userRepository)
      ]
      this.setup()
    }

    private setup (): void {
      this.routes.forEach(item => {
        this.router.use(item.router)
      })
    }
}

export default RouterV1
