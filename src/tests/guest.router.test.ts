import { it, describe, before, after } from 'mocha'
import { expect } from 'chai'
import request from 'supertest'
import express from 'express'
import mongoose from 'mongoose'

import App from '../app'
import RepositoryFactory from './../factories/v1/repository.factory.v1'
import MailService from './mocks/mail.service.mock'
import TokenManager from '../utils/components/tokenManager'
import GuestModel from './../models/v1/guests/guest.model.v1'

const server = express()
const app = new App(server, RepositoryFactory, MailService)
app.setup()

const { token } = TokenManager.signUser('abb123')

async function clearDatabase (): Promise<void> {
  await GuestModel.deleteMany({})
}

function createSampleGuests (): void {
  const people = [
    'Jonatas',
    'Deise',
    'Ebert',
    'Sarah',
    'Jenifer'
  ]

  people.forEach(name => {
    const guest = new GuestModel({ name })
    guest.save()
  })
}

before(async () => {
  await clearDatabase()
  await createSampleGuests()
})

after(async () => {
  await clearDatabase()
})

describe('Guests', () => {
  it('Authentication is required', (done) => {
    request(server)
      .get('/api/v1/guests')
      .expect(401, done)
  })

  it('Retrieve guests', () => {
    request(server)
      .get('/api/v1/guests')
      .set('authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          throw err
        }

        const {
          items,
          pagination
        } = res.body

        const names: string[] = items.map((item: { name: string }) => {
          return item.name
        }).sort()

        expect(5).equal(pagination.total)
        expect(10).equal(pagination.limit)
        expect(1).equal(pagination.page)
        expect(1).equal(pagination.pages)

        expect('Deise').equal(names[0])
        expect('Ebert').equal(names[1])
        expect('Jenifer').equal(names[2])
        expect('Jonatas').equal(names[3])
        expect('Sarah').equal(names[4])
      })
  })

  it('Retrieve existent guest', async () => {
    const guests = await GuestModel.find()
    const id = guests[0].id

    request(server)
      .get(`/api/v1/guests/${id}`)
      .set('authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          throw err
        }

        const {
          id,
          name,
          invitationDelivered,
          isGodfather,
          isActive
        } = res.body

        expect(id).equal(id)
        expect('Jonatas').equal(name)
        expect(false).equal(invitationDelivered)
        expect(false).equal(isGodfather)
        expect(true).equal(isActive)
      })
  })

  it('Status code must be equal to 404 when guest does not exist', (done) => {
    const id = mongoose.Types.ObjectId()
    request(server)
      .get('/api/v1/guests/' + id)
      .set('authorization', token)
      .expect(404, done)
  })
})

// describe('Guest invitation', () => {
//   it('Authentication is required', (done) => {
//     request(server)
//       .patch('/api/v1/guests/5dc9319f5187692e3d64a2ebb/invitation')
//       .expect(401, done)
//   })

//   it('Send invitation should require status', () => {
//     request(server)
//       .patch('/api/v1/guests/1/invitation')
//       .set('authorization', token)
//       .expect(422)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { throw err }

//         const { errors } = res.body

//         expect(errors[0].msg).to.be.equal('O campo status é obrigatório')
//         expect(errors[0].param).to.be.equal('status')
//         expect(errors[0].location).to.be.equal('body')

//         expect(errors[1].msg).to.be.equal('O campo status deve conter um valor do tipo boolean')
//         expect(errors[1].param).to.be.equal('status')
//         expect(errors[1].location).to.be.equal('body')
//       })
//   })

//   it('Status code must be 404 when guest does note exist', (done) => {
//     request(server)
//       .patch('/api/v1/guests/5dc9319f5187692e3d64a2ebb/invitation')
//       .set('authorization', token)
//       .send({
//         status: true
//       })
//       .expect(404, done)
//   })

//   it('Mark invitation as delivered', () => {
//     request(server)
//       .patch('/api/v1/guests/0/invitation')
//       .set('authorization', token)
//       .send({
//         status: true
//       })
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { throw err }

//         const {
//           id,
//           name,
//           invitationDelivered
//         } = res.body

//         expect(id).to.be.equal('0')
//         expect(name).to.be.equal('Jonatas')
//         expect(invitationDelivered).to.be.equal(true)
//       })
//   })

//   it('Mark invitation as undelivered', () => {
//     request(server)
//       .patch('/api/v1/guests/2/invitation')
//       .set('authorization', token)
//       .send({
//         status: false
//       })
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { throw err }

//         const {
//           id,
//           name,
//           invitationDelivered
//         } = res.body

//         expect(id).to.be.equal('2')
//         expect(name).to.be.equal('Ebert')
//         expect(invitationDelivered).to.be.equal(false)
//       })
//   })
// })

// describe('Guest register', () => {
//   it('Authentication is required', (done) => {
//     request(server)
//       .post('/api/v1/guests')
//       .expect(401, done)
//   })

//   it('Return guest infos after store successful', () => {
//     request(server)
//       .post('/api/v1/guests')
//       .set('authorization', token)
//       .send({
//         name: 'Ana Paula',
//         email: 'ana.paula@gmail.com'
//       })
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { throw err }

//         const {
//           name,
//           email
//         } = res.body

//         expect(name).to.be.equal('Ana Paula')
//         expect(email).to.be.equal('ana.paula@gmail.com')
//       })
//   })

//   it('Name must be required', () => {
//     request(server)
//       .post('/api/v1/guests')
//       .set('authorization', token)
//       .expect(422)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { throw err }

//         const { errors } = res.body

//         expect(errors[0].msg).to.be.equal('O campo nome é obrigatório')
//         expect(errors[0].param).to.be.equal('name')
//         expect(errors[0].location).to.be.equal('body')
//       })
//   })

//   it('Name must be longer than 3 characters', () => {
//     request(server)
//       .post('/api/v1/guests')
//       .set('authorization', token)
//       .send({
//         name: 'ad'
//       })
//       .expect(422)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { throw err }

//         const { errors } = res.body

//         expect(errors[0].msg).to.be.equal('O campo nome deve conter ao menos 3 caracteres')
//         expect(errors[0].param).to.be.equal('name')
//         expect(errors[0].location).to.be.equal('body')
//       })
//   })

//   it('Email must be valid', () => {
//     request(server)
//       .post('/api/v1/guests')
//       .set('authorization', token)
//       .send({
//         name: 'Adriano',
//         email: 'adriano.souza.com.br'
//       })
//       .expect(422)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { throw err }

//         const { errors } = res.body

//         expect(errors[0].msg).to.be.equal('Deve conter um email válido')
//         expect(errors[0].param).to.be.equal('email')
//         expect(errors[0].location).to.be.equal('body')
//       })
//   })

//   it('Email must be unique', () => {
//     request(server)
//       .post('/api/v1/guests')
//       .set('authorization', token)
//       .send({
//         name: 'Jonatas Castro',
//         email: 'jonatas@gmail.com'
//       })
//       .expect(422)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) { throw err }

//         // const { errors } = res.body

//         // expect(errors[0].msg).to.be.equal('Deve conter um email válido')
//         // expect(errors[0].param).to.be.equal('email')
//         // expect(errors[0].location).to.be.equal('body')
//       })
//   })
// })
