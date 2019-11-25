import { it, describe } from 'mocha'
import { expect } from 'chai'
import request from 'supertest'
import express from 'express'

import App from '../app'
import RepositoryFactory from './mocks/repository.factory.mock'
import MailService from './mocks/mail.service.mock'
import TokenManager from '../utils/components/tokenManager'

const server = express()
const app = new App(server, RepositoryFactory, MailService)
app.setup()

const { token } = TokenManager.signUser('abb123')

describe('Guests', () => {
  it('Authentication is required', () => {
    request(server)
      .get('/api/v1/guests')
      .expect(401)
      .end((err) => {
        if (err) { throw err }
      })
  })

  it('Retrieve guests', () => {
    request(server)
      .get('/api/v1/guests')
      .set('authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const {
          items,
          pagination
        } = res.body

        expect(pagination.total).to.be.equal(4)

        expect(items[0].name).to.be.equal('Jonatas')
        expect(items[1].name).to.be.equal('Deise')
        expect(items[2].name).to.be.equal('Ebert')
        expect(items[3].name).to.be.equal('Sarah')
      })
  })
})

describe('Guest invitation', () => {
  it('Authentication is required', () => {
    request(server)
      .patch('/api/v1/guests/5dc9319f5187692e3d64a2ebb/invitation')
      .expect(401)
      .end((err) => {
        if (err) { throw err }
      })
  })

  it('Send invitation should require status', () => {
    request(server)
      .patch('/api/v1/guests/1/invitation')
      .set('authorization', token)
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        expect(errors[0].msg).to.be.equal('O campo status é obrigatório')
        expect(errors[0].param).to.be.equal('status')
        expect(errors[0].location).to.be.equal('body')

        expect(errors[1].msg).to.be.equal('O campo status deve conter um valor do tipo boolean')
        expect(errors[1].param).to.be.equal('status')
        expect(errors[1].location).to.be.equal('body')
      })
  })

  it('Existing user required', () => {
    request(server)
      .patch('/api/v1/guests/5dc9319f5187692e3d64a2ebb/invitation')
      .set('authorization', token)
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        expect(errors[0].msg).to.be.equal('O convidado não existe')
        expect(errors[0].param).to.be.equal('id')
        expect(errors[0].location).to.be.equal('params')
        expect(errors[0].value).to.be.equal('5dc9319f5187692e3d64a2ebb')
      })
  })

  it('Mark invitation with delivered', () => {
    request(server)
      .patch('/api/v1/guests/0/invitation')
      .set('authorization', token)
      .send({
        status: true
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const {
          id,
          name,
          invitationDelivered
        } = res.body

        expect(id).to.be.equal('0')
        expect(name).to.be.equal('Jonatas')
        expect(invitationDelivered).to.be.equal(true)
      })
  })

  it('Mark invitation with undelivered', () => {
    request(server)
      .patch('/api/v1/guests/2/invitation')
      .set('authorization', token)
      .send({
        status: false
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const {
          id,
          name,
          invitationDelivered
        } = res.body

        expect(id).to.be.equal('2')
        expect(name).to.be.equal('Ebert')
        expect(invitationDelivered).to.be.equal(false)
      })
  })
})
