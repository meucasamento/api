import { it, describe } from 'mocha'
import { expect } from 'chai'
import request from 'supertest'
import express from 'express'

import App from './../app'
import RepositoryFactory from './mocks/repository.factory.mock'
import MailService from './mocks/mail.service.mock'
import TokenManager from './../utils/components/tokenManager'

const server = express()
const app = new App(server, RepositoryFactory, MailService)
app.setup()

describe('Session Router', () => {
  it('Should return token after authentication successful', () => {
    request(server)
      .post('/api/v1/session/authentication')
      .send({
        email: 'adriano@gmail.com',
        password: '12345678'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) { throw err }
        const { token, expiresIn } = res.body
        const { id } = TokenManager.verify(token)
        expect(id).to.be.equal('0')
        expect(token).not.to.be.equal(null)
        expect(expiresIn).to.be.equal(3600)
      })
  })

  it('Should not return token after authentication failed', () => {
    request(server)
      .post('/api/v1/session/authentication')
      .send({
        email: 'guest@gmail.com',
        password: '123'
      })
      .expect(401)
      .end((err) => {
        if (err) { throw err }
      })
  })
})
