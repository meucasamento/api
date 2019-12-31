import express from 'express'

import App from './app'
import config from './config/env'
import mailgunService from './utils/components/mail/mailgun.service'
import repositoryFactory from './factories/v1/repository.factory.v1'

const server = express()

const app = new App(server, repositoryFactory, mailgunService)
app.setup()

server.listen(config.port, () => {
  console.log(`App listening on the port ${config.port}`)
})
