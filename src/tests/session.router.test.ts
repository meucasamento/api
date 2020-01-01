import { it, describe, before, after } from 'mocha'
import { expect } from 'chai'
import request from 'supertest'
import express from 'express'

import App from '../app'
import RepositoryFactory from '../factories/v1/repository.factory.v1'
import MailService from './mocks/mail.service.mock'
import UserModel from './../models/v1/users/user.model.v1'
import encryption from './../utils/encryption'

const server = express()
const app = new App(server, RepositoryFactory, MailService)
app.setup()

async function clearDatabase (): Promise<void> {
  await UserModel.deleteMany({})
}

function createSampleGuests (): void {
  const people = [
    'Adriano',
    'Jenifer'
  ]

  people.forEach(async name => {
    const user = new UserModel({
      name,
      email: `${name.toLowerCase()}@gmail.com`,
      password: await encryption.hash('12345678')
    })
    user.save()
  })
}

before(async () => {
  await clearDatabase()
  await createSampleGuests()
})

after(async () => {
  await clearDatabase()
})

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

        const {
          token,
          expiresIn,
          password
        } = res.body

        expect(null || undefined).to.be.not.equal(token)
        expect(3600).to.be.equal(expiresIn)
        expect(undefined).to.be.equal(password)
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

        const {
          name,
          email,
          password
        } = res.body

        expect(name).to.be.equal('User Test')
        expect(email).to.be.equal('new_user_test@gmail.com')
        expect(password).to.be.equal(undefined)
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
