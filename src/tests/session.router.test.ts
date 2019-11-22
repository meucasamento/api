import { it, describe } from 'mocha'
import { assert, expect } from 'chai'
import request from 'supertest'
import express from 'express'

import App from './../app'
import RepositoryFactory from './mocks/repository.factory.mock'
import MailService from './mocks/mail.service.mock'

const server = express()
const app = new App(server, RepositoryFactory, MailService)
app.setup()

describe('Session Router', () => {
  it('Primeiro test com supertest', () => {
    request(server)
      .post('/users')
      .expect(200)
      .end((err, res) => {
        if (err) { throw err }
      })
  })
})
