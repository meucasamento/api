import RouterInterface from '../router.interface'
import DashboardController from '../../controllers/v1/dashboard.controller.v1'
import DashboardRepositoryInterface from '../../repositories/dashboard/dashboardRepository.interface'
import auth from '../../middlewares/v1/auth.middleware.v1'

class DashboardRouter extends RouterInterface {
    private controller: DashboardController

    constructor (repository: DashboardRepositoryInterface) {
      super()
      this.controller = new DashboardController(repository)
      this.setup()
    }

    private setup = (): void => {
      this.router.use('/dashboard', auth.checkToken)
      this.router.get('/dashboard/report', this.controller.report)
    }
}

export default DashboardRouter
