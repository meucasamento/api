import express from 'express'

import App from './app'
import config from './config'
import mailgunService from './utils/components/mail/mailgun.service'
import database from './database/database'
import repositoryFactory from './factories/v1/repository.factory.v1'

const server = express()

const app = new App(server, repositoryFactory, mailgunService)
app.setup()

server.listen(config.port, () => {
  database.setup()
  console.log(`App listening on the port ${config.port}`)
})
