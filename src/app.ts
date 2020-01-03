import express, { Router } from 'express'

class App {
  public express: express.Application
  private routes = Router()

  public constructor () {
    this.express = express()
    this.routes.get('/users', (req, res) => {
      res.json({ name: 'Adriano Souza Costa' })
    })
    this.express.use(this.routes)
    this.express.use(express.json())
  }
}

export default new App().express
