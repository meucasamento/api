import { Request, Response, NextFunction } from 'express'
import DashboardRepositoryInterface from './../../repositories/dashboard/dashboardRepository.interface'

class DashboardController {
    private repository: DashboardRepositoryInterface

    constructor (repository: DashboardRepositoryInterface) {
      this.repository = repository
    }

    report = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
      try {
        const report = await this.repository.report()
        return res.send(report)
      } catch (error) {
        next(error)
      }
    }
}

export default DashboardController
