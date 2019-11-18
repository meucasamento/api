import RepositoryFactoryInterface from '../../factories/v1/repository.factory.interface.v1'
import RouterInterface from '../router.interface'

import UserRouter from './user.router.v1'
import GuestRouter from './guest.router.v1'
import DashboardRouter from './dashboard.router.v1'
import SessionRoutes from './session.router.v1'
import MailServiceInterface from '../../utils/components/Mail/Mail.service.interface'

class RouterV1 extends RouterInterface {
    private routers: RouterInterface[]

    constructor (repositoryFactory: RepositoryFactoryInterface,
      mailService: MailServiceInterface) {
      super()
      this.routers = [
        new UserRouter(repositoryFactory.userRepository),
        new GuestRouter(repositoryFactory.guestRepository),
        new DashboardRouter(repositoryFactory.dashboardRepository),
        new SessionRoutes(repositoryFactory.userRepository, mailService)
      ]
      this.setup()
    }

    private setup (): void {
      this.routers.forEach(item => {
        this.router.use(item.router)
      })
    }
}

export default RouterV1
