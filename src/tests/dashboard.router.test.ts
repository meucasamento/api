import * as supertest from 'supertest'

import App from './../app'
import RepositoryFactoryMock from './mocks/repository.factory.mock'
import MailServiceMock from './mocks/mail.service.mock'

/* eslint-disable no-undef */

test('Primeiro teste com rota', async () => {
  const app = new App(RepositoryFactoryMock, MailServiceMock)
  supertest(app)
    .post('/api/v1/session/authentication')
    .expect('Content-Type', '/json/')
    .expect(200, 'ok')
    .end((err, res) => {
      if (err) throw err
    })
})
