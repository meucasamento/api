/* eslint-disable no-undef */

import express from 'express'
import { expect } from 'chai'
import request from 'supertest'

import App from '../app'
import ResposiroryFactoryMock from './mocks/repository.factory.mock'
import MailServiceMock from './mocks/mail.service.mock'

const server = express()

const app = new App(server, ResposiroryFactoryMock, MailServiceMock)

describe('Session Router', () => {
  it('Authorization token', () => {
    // request(app)
    //   .post('/api/v1/session/authentication')
    //   .set('Accept', 'application/json')
    //   .send({ email: 'teste', password: '1234567' })
    //   .expect('Content-Type', /json/)
    //   .expect(200)
    //   .end(function (err, res) {
    //     if (err) throw err
    //     const { name } = res.body
    //     expect(name).to.be.equal('john')
    //   })
  })
})
