/* eslint-disable no-undef */

// import { assert } from 'chai'
import * as express from 'express'
import * as request from 'supertest'

// import App from './../app'
// import ResposiroryFactoryMock from './mocks/repository.factory.mock'
// import MailServiceMock from './mocks/mail.service.mock'

describe('Dashboard Router', () => {
  it('Report dashboard', (done) => {
    const app = express()
    app.get('/user', (req, res) => {
      res.status(200).json({ name: 'john' })
    })

    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200, done)
    // const app = new App(ResposiroryFactoryMock, MailServiceMock)
    // await request(app.express)
    //   .get('/users')
    //   .set('Accept', 'application/json')
    //   .expect('Content-Type', /json/)
    //   .expect(204)
    //   .end(() => {
    //     // console.log(err)
    //     done()
    //   })
  })
})
