import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from './utils/config/config'

import RepositoriesFactoryInteface from './factories/v1/repository.factory.interface.v1'
import RoutesV1 from './routes/v1/routes.v1'
import ErrorMiddleware from './middlewares/v1/error.middleware.v1'

class App {
    public express: express.Application

    private routesV1: RoutesV1

    constructor (repositoriesFactory: RepositoriesFactoryInteface) {
      this.routesV1 = new RoutesV1(repositoriesFactory)
      this.express = express()
      this.middlewares()
      this.routes()
      this.errorHandling()
      this.connectToTheDatabase()
    }

    private middlewares (): void {
      this.express.use(helmet())
      this.express.use(express.json())
      this.express.use(cors())
      this.express.use(bodyParser.json())
    }

    private routes (): void {
      this.express.use('/api/v1', this.routesV1.routes)
    }

    private errorHandling(): void {
      this.express.use(ErrorMiddleware.checkError)
    }

    private connectToTheDatabase() {
      mongoose.set('useCreateIndex', true)
      
      mongoose.connect(config.mongoURL, {
          useUnifiedTopology: true,
          useNewUrlParser: true
      })
      
      mongoose.connection.on('connected', function () {  
        console.log(`Mongoose default connection open to ${config.mongoURL}`);
      })
      
      mongoose.connection.on('error', function (err) {  
        console.log(`Mongoose default connection error: ${err}`);
      })
      
      mongoose.connection.on('disconnected', function () {  
        console.log('Mongoose default connection disconnected'); 
      })

      process.on('SIGINT', function() {  
        mongoose.connection.close(function () { 
          console.log('Mongoose default connection disconnected through app termination'); 
          process.exit(0); 
        })
      })
    }
}

export default App
