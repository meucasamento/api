import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import express, { json } from 'express'

import Database from './database/database'
import RepositoryFactoryInteface from './factories/v1/repository.factory.interface.v1'
import RoutesV1 from './routes/v1/router.v1'
import ErrorMiddleware from './middlewares/v1/error.middleware.v1'
import RouterInterface from './routes/router.interface'

import MailServiceInterface from './utils/components/mail/mail.service.interface'

class App {
  private express: express.Application
  private routerV1: RouterInterface

  constructor (repositoryFactory: RepositoryFactoryInteface,
    emailService: MailServiceInterface) {
    this.express = express()
    this.routerV1 = new RoutesV1(repositoryFactory, emailService)
  }

  public setup (): void {
    Database.setup()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(helmet())
    this.express.use(json())
    this.express.use(cors())
    this.express.use(bodyParser.json())
    this.express.use(ErrorMiddleware.checkError)
  }

  private routes (): void {
    this.express.use('/api/v1', this.routerV1.router)
  }
}

export default App
