"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mocha = require('mocha');
var _chai = require('chai');
var _supertest = require('supertest'); var _supertest2 = _interopRequireDefault(_supertest);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

var _app = require('../app'); var _app2 = _interopRequireDefault(_app);
var _repositoryfactoryv1 = require('./../factories/v1/repository.factory.v1'); var _repositoryfactoryv12 = _interopRequireDefault(_repositoryfactoryv1);
var _mailservicemock = require('./mocks/mail.service.mock'); var _mailservicemock2 = _interopRequireDefault(_mailservicemock);
var _tokenManager = require('../utils/components/tokenManager'); var _tokenManager2 = _interopRequireDefault(_tokenManager);
var _guestmodelv1 = require('./../models/v1/guests/guest.model.v1'); var _guestmodelv12 = _interopRequireDefault(_guestmodelv1);

const server = _express2.default.call(void 0, )
const app = new (0, _app2.default)(server, _repositoryfactoryv12.default, _mailservicemock2.default)
app.setup()

const { token } = _tokenManager2.default.signUser('abb123')

async function clearDatabase () {
  await _guestmodelv12.default.deleteMany({})
}

async function createSampleGuests () {
  const people = [
    'Jonatas',
    'Deise',
    'Ebert',
    'Sarah',
    'Jenifer'
  ]

  people.forEach(async name => {
    const guest = await new (0, _guestmodelv12.default)({
      name,
      email: `${name.toLowerCase()}@gmail.com`
    })
    guest.save()
  })
}

_mocha.before.call(void 0, async () => {
  await clearDatabase()
  await createSampleGuests()
})

_mocha.after.call(void 0, async () => {
  await clearDatabase()
})

_mocha.describe.call(void 0, 'Guests', () => {
  _mocha.it.call(void 0, 'Authentication is required', (done) => {
    _supertest2.default.call(void 0, server)
      .get('/api/v1/guests')
      .expect(401, done)
  })

  _mocha.it.call(void 0, 'Retrieve guests', () => {
    _supertest2.default.call(void 0, server)
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

        const names = items.map((item) => {
          return item.name
        }).sort()

        _chai.expect.call(void 0, 5).equal(pagination.total)
        _chai.expect.call(void 0, 10).equal(pagination.limit)
        _chai.expect.call(void 0, 1).equal(pagination.page)
        _chai.expect.call(void 0, 1).equal(pagination.pages)

        _chai.expect.call(void 0, 'Deise').equal(names[0])
        _chai.expect.call(void 0, 'Ebert').equal(names[1])
        _chai.expect.call(void 0, 'Jenifer').equal(names[2])
        _chai.expect.call(void 0, 'Jonatas').equal(names[3])
        _chai.expect.call(void 0, 'Sarah').equal(names[4])
      })
  })

  _mocha.it.call(void 0, 'Retrieve existent guest', async () => {
    const guests = await _guestmodelv12.default.find()
    const id = guests[0].id

    _supertest2.default.call(void 0, server)
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

        _chai.expect.call(void 0, id).equal(id)
        _chai.expect.call(void 0, 'Jonatas').equal(name)
        _chai.expect.call(void 0, false).equal(invitationDelivered)
        _chai.expect.call(void 0, false).equal(isGodfather)
        _chai.expect.call(void 0, true).equal(isActive)
      })
  })

  _mocha.it.call(void 0, 'Status code must be equal to 404 when guest does not exist', (done) => {
    const id = _mongoose2.default.Types.ObjectId()
    _supertest2.default.call(void 0, server)
      .get('/api/v1/guests/' + id)
      .set('authorization', token)
      .expect(404, done)
  })
})

_mocha.describe.call(void 0, 'Guest invitation', () => {
  _mocha.it.call(void 0, 'Authentication is required', (done) => {
    _supertest2.default.call(void 0, server)
      .patch('/api/v1/guests/5dc9319f5187692e3d64a2ebb/invitation')
      .expect(401, done)
  })

  _mocha.it.call(void 0, 'Send invitation should require status', async () => {
    const guests = await _guestmodelv12.default.find()
    const id = guests[0].id

    _supertest2.default.call(void 0, server)
      .patch(`/api/v1/guests/${id}/invitation`)
      .set('authorization', token)
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('O campo status é obrigatório')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('status')
        _chai.expect.call(void 0, errors[0].location).to.be.equal('body')

        _chai.expect.call(void 0, errors[1].msg).to.be.equal('O campo status deve conter um valor do tipo boolean')
        _chai.expect.call(void 0, errors[1].param).to.be.equal('status')
        _chai.expect.call(void 0, errors[1].location).to.be.equal('body')
      })
  })

  _mocha.it.call(void 0, 'Status code must be 404 when guest does note exist', (done) => {
    const id = _mongoose2.default.Types.ObjectId()

    _supertest2.default.call(void 0, server)
      .patch(`/api/v1/guests/${id}/invitation`)
      .set('authorization', token)
      .send({
        status: true
      })
      .expect(404, done)
  })

  _mocha.it.call(void 0, 'Mark invitation as delivered', async () => {
    const guests = await _guestmodelv12.default.find()
    const identifier = guests[0].id

    _supertest2.default.call(void 0, server)
      .patch(`/api/v1/guests/${identifier}/invitation`)
      .set('authorization', token)
      .send({
        status: true
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const {
          _id,
          name,
          invitationDelivered
        } = res.body

        _chai.expect.call(void 0, identifier).to.be.equal(_id)
        _chai.expect.call(void 0, 'Jonatas').to.be.equal(name)
        _chai.expect.call(void 0, true).to.be.equal(invitationDelivered)
      })
  })

  _mocha.it.call(void 0, 'Mark invitation as undelivered', async () => {
    const guests = await _guestmodelv12.default.find()
    const identifier = guests[1].id

    _supertest2.default.call(void 0, server)
      .patch(`/api/v1/guests/${identifier}/invitation`)
      .set('authorization', token)
      .send({
        status: false
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const {
          _id,
          name,
          invitationDelivered
        } = res.body

        _chai.expect.call(void 0, identifier).to.be.equal(_id)
        _chai.expect.call(void 0, 'Deise').to.be.equal(name)
        _chai.expect.call(void 0, false).to.be.equal(invitationDelivered)
      })
  })
})

_mocha.describe.call(void 0, 'Guest register', () => {
  _mocha.it.call(void 0, 'Authentication is required', (done) => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/guests')
      .expect(401, done)
  })

  _mocha.it.call(void 0, 'Return guest infos after store successful', () => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/guests')
      .set('authorization', token)
      .send({
        name: 'Ana Paula',
        email: 'ana.paula@gmail.com'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const {
          name,
          email
        } = res.body

        _chai.expect.call(void 0, name).to.be.equal('Ana Paula')
        _chai.expect.call(void 0, email).to.be.equal('ana.paula@gmail.com')
      })
  })

  _mocha.it.call(void 0, 'Name must be required', () => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/guests')
      .set('authorization', token)
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('O campo nome é obrigatório')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('name')
        _chai.expect.call(void 0, errors[0].location).to.be.equal('body')
      })
  })

  _mocha.it.call(void 0, 'Name must be longer than 3 characters', () => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/guests')
      .set('authorization', token)
      .send({
        name: 'ad'
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('O campo nome deve conter ao menos 3 caracteres')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('name')
        _chai.expect.call(void 0, errors[0].location).to.be.equal('body')
      })
  })

  _mocha.it.call(void 0, 'Email must be valid', () => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/guests')
      .set('authorization', token)
      .send({
        name: 'Adriano',
        email: 'adriano.souza.com.br'
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('Deve conter um email válido')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('email')
        _chai.expect.call(void 0, errors[0].location).to.be.equal('body')
      })
  })

  _mocha.it.call(void 0, 'Email must be unique', () => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/guests')
      .set('authorization', token)
      .send({
        name: 'Jonatas Castro',
        email: 'jonatas@gmail.com'
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('O email já está sendo utilizado')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('email')
        _chai.expect.call(void 0, errors[0].location).to.be.equal('body')
      })
  })
})
