import { it, describe, before, after } from 'mocha'
import { expect } from 'chai'
import request from 'supertest'
import express from 'express'

import App from '../app'
import RepositoryFactory from './../factories/v1/repository.factory.v1'
import MailService from './mocks/mail.service.mock'
import TokenManager from '../utils/components/tokenManager'
import GuestModel from './../models/v1/guests/guest.model.v1'

const server = express()
const app = new App(server, RepositoryFactory, MailService)
app.setup()

async function clearDatabase (): Promise<void> {
  await GuestModel.deleteMany({})
}

async function createSampleGuests (): Promise<void> {
  await new GuestModel({
    name: 'one',
    email: 'one@gmail.com'
  }).save()

  await new GuestModel({
    name: 'two',
    email: 'two@gmail.com',
    invitationDelivered: true,
    isGodfather: true
  }).save()

  await new GuestModel({
    name: 'three',
    email: 'three@gmail.com',
    invitationDelivered: true
  }).save()

  await new GuestModel({
    name: 'four',
    email: 'four@gmail.com',
    invitationDelivered: true,
    isGodfather: true
  }).save()

  await new GuestModel({
    name: 'five',
    email: 'five@gmail.com',
    invitationDelivered: true
  }).save()
}

before(async () => {
  await clearDatabase()
  await createSampleGuests()
})

after(async () => {
  await clearDatabase()
})

describe('Dashboard', () => {
  it('Authentication is required', (done) => {
    request(server)
      .get('/api/v1/dashboard/report')
      .expect(401, done)
  })

  it('Must be return report', async () => {
    const { token } = TokenManager.signUser('abb123')

    request(server)
      .get('/api/v1/dashboard/report')
      .set('authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const {
          guests,
          godfathers,
          invitationsDelivered,
          undeliverableInvitations
        } = res.body

        console.log(res.body)

        expect(5).to.be.equal(guests)
        expect(2).to.be.equal(godfathers)
        expect(4).to.be.equal(invitationsDelivered)
        expect(1).to.be.equal(undeliverableInvitations)
      })
  })
})
