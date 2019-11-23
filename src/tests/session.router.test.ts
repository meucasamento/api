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

  it('Should return status code 401 from authentication failed', () => {
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

  it('Email must be required', () => {
    request(server)
      .post('/api/v1/session/authentication')
      .send({
        password: '123'
      })
      .expect(422)
      .end((err, res) => {
        if (err) { throw err }
        const { errors } = res.body
        expect(errors[0].msg).to.be.equal('Deve conter um email válido')
        expect(errors[0].param).to.be.equal('email')
      })
  })

  it('Password must be required', () => {
    request(server)
      .post('/api/v1/session/authentication')
      .send({
        email: 'adriano@gmail.com'
      })
      .expect(422)
      .end((err, res) => {
        if (err) { throw err }
        const { errors } = res.body
        expect(errors[0].msg).to.be.equal('O campo password é obrigatório')
        expect(errors[0].param).to.be.equal('password')
      })
  })
})
