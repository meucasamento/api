import { it, describe } from 'mocha'
import { expect } from 'chai'
import request from 'supertest'
import express from 'express'

import App from './../app'
import RepositoryFactory from './../factories/v1/repository.factory.v1'
import MailService from './mocks/mail.service.mock'
import TokenManager from './../utils/components/tokenManager'

const server = express()
const app = new App(server, RepositoryFactory, MailService)
app.setup()

describe('Authentication', () => {
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

  it('Should return status code 401 from authentication failed', (done) => {
    request(server)
      .post('/api/v1/session/authentication')
      .send({
        email: 'guest@gmail.com',
        password: '123'
      })
      .expect(401, done)
  })

  it('Validation consistency', () => {
    request(server)
      .post('/api/v1/session/authentication')
      .send()
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }
        const { errors } = res.body

        expect(errors[0].msg).to.be.equal('Deve conter um email válido')
        expect(errors[0].param).to.be.equal('email')
        expect(errors[0].location).to.be.equal('body')

        expect(errors[1].msg).to.be.equal('O campo password é obrigatório')
        expect(errors[1].param).to.be.equal('password')
        expect(errors[1].location).to.be.equal('body')
      })
  })
})

describe('Reset password', () => {
  it('Must be return status code 200', (done) => {
    request(server)
      .post('/api/v1/session/reset_password')
      .send({
        email: 'adriano@gmail.com'
      })
      .expect(200, done)
  })

  it('Email must be not empty', () => {
    request(server)
      .post('/api/v1/session/reset_password')
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }
        const { errors } = res.body
        expect(errors[0].msg).to.be.equal('Deve conter um email válido')
        expect(errors[0].param).to.be.equal('email')
      })
  })

  it('Required valid email', () => {
    request(server)
      .post('/api/v1/session/reset_password')
      .send({
        email: 'guest.com.br'
      })
      .expect(422)
      .end((err, res) => {
        if (err) { throw err }
        const { errors } = res.body
        expect(errors[0].msg).to.be.equal('Deve conter um email válido')
        expect(errors[0].param).to.be.equal('email')
      })
  })

  it('Validation when not exists user with email', () => {
    request(server)
      .post('/api/v1/session/reset_password')
      .send({
        email: 'adriano_fake@gmail.com.br'
      })
      .expect(422)
      .end((err, res) => {
        if (err) { throw err }
        const { errors } = res.body
        expect(errors[0].msg).to.be.equal('Não existe nenhum usuário com esse email')
        expect(errors[0].param).to.be.equal('email')
      })
  })
})

describe('Session register', () => {
  it('Return user infos after user store successful', () => {
    request(server)
      .post('/api/v1/session/register')
      .send({
        name: 'User Test',
        email: 'new_user_test@gmail.com',
        password: '12345678'
      })
      .expect(200)
      .end((err, res) => {
        if (err) { throw err }
        const { name, email } = res.body

        expect(name).to.be.equal('User Test')
        expect(email).to.be.equal('new_user_test@gmail.com')
      })
  })

  it('Validation consistency', () => {
    request(server)
      .post('/api/v1/session/register')
      .expect(422)
      .end((err, res) => {
        if (err) { throw err }
        const { errors } = res.body

        expect(errors[0].msg).to.be.equal('O campo nome é obrigatório')
        expect(errors[0].param).to.be.equal('name')
        expect(errors[0].location).to.be.equal('body')

        expect(errors[1].msg).to.be.equal('Deve conter um email válido')
        expect(errors[1].param).to.be.equal('email')
        expect(errors[1].location).to.be.equal('body')

        expect(errors[2].msg).to.be.equal('O campo password é obrigatório')
        expect(errors[2].param).to.be.equal('password')
        expect(errors[2].location).to.be.equal('body')
      })
  })

  it('Required valid email', () => {
    request(server)
      .post('/api/v1/session/register')
      .send({
        name: 'User Test',
        email: 'new_user_test@.com',
        password: '12345678'
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }
        const { errors } = res.body

        expect(errors[0].msg).to.be.equal('Deve conter um email válido')
        expect(errors[0].param).to.be.equal('email')
        expect(errors[0].location).to.be.equal('body')
      })
  })

  it('Should not pass up a existing email', () => {
    request(server)
      .post('/api/v1/session/register')
      .send({
        name: 'User Test',
        email: 'adriano@gmail.com',
        password: '12345678'
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }
        const { errors } = res.body

        expect(errors[0].msg).to.be.equal('O email já está sendo utilizado')
        expect(errors[0].param).to.be.equal('email')
        expect(errors[0].location).to.be.equal('body')
      })
  })
})
