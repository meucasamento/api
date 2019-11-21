import { Application } from 'express'
import RepositoryFactoryInteface from './factories/v1/repository.factory.interface.v1'
import RoutesV1 from './routes/v1/router.v1'
import ErrorMiddleware from './middlewares/v1/error.middleware.v1'
import RouterInterface from './routes/router.interface'

import MailServiceInterface from './utils/components/mail/mail.service.interface'

class App {
  private server: Application
  private routerV1: RouterInterface

  constructor (server: Application,
    repositoryFactory: RepositoryFactoryInteface,
    emailService: MailServiceInterface) {
    this.server = server
    this.routerV1 = new RoutesV1(repositoryFactory, emailService)
  }

  public setup (): void {
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.server.use(ErrorMiddleware.checkError)
  }

  private routes (): void {
    this.server.use('/api/v1', this.routerV1.router)
  }
}

export default App
