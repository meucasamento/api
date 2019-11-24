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

describe('Dashboard', () => {
  it('Require authentication', () => {
    request(server)
      .get('/api/v1/dashboard/report')
      .expect(401)
      .end((err) => {
        if (err) { throw err }
      })
  })

  it('Must be return a report', () => {
    request(server)
      .get('/api/v1/dashboard/report')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) { throw err }
        const {
          guests,
          godparents,
          invitationsDelivered,
          undeliverableInvitations
        } = res.body
        expect(guests).to.be.equal(3)
        expect(godparents).to.be.equal(1)
        expect(invitationsDelivered).to.be.equal(1)
        expect(undeliverableInvitations).to.be.equal(2)
      })
  })
})
