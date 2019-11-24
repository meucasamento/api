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
  it('Require authentication', () => {
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
