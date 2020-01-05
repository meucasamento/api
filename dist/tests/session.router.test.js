"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mocha = require('mocha');
var _chai = require('chai');
var _supertest = require('supertest'); var _supertest2 = _interopRequireDefault(_supertest);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _app = require('../app'); var _app2 = _interopRequireDefault(_app);
var _repositoryfactoryv1 = require('../factories/v1/repository.factory.v1'); var _repositoryfactoryv12 = _interopRequireDefault(_repositoryfactoryv1);
var _mailservicemock = require('./mocks/mail.service.mock'); var _mailservicemock2 = _interopRequireDefault(_mailservicemock);
var _usermodelv1 = require('./../models/v1/users/user.model.v1'); var _usermodelv12 = _interopRequireDefault(_usermodelv1);
var _encryption = require('./../utils/encryption'); var _encryption2 = _interopRequireDefault(_encryption);

const server = _express2.default.call(void 0, )
const app = new (0, _app2.default)(server, _repositoryfactoryv12.default, _mailservicemock2.default)
app.setup()

async function clearDatabase () {
  await _usermodelv12.default.deleteMany({})
}

function createSampleGuests () {
  const people = [
    'Adriano',
    'Jenifer'
  ]

  people.forEach(async name => {
    const user = new (0, _usermodelv12.default)({
      name,
      email: `${name.toLowerCase()}@gmail.com`,
      password: await _encryption2.default.hash('12345678')
    })
    user.save()
  })
}

_mocha.before.call(void 0, async () => {
  await clearDatabase()
  await createSampleGuests()
})

_mocha.after.call(void 0, async () => {
  await clearDatabase()
})

_mocha.describe.call(void 0, 'Authentication', () => {
  _mocha.it.call(void 0, 'Should return token after authentication successful', () => {
    _supertest2.default.call(void 0, server)
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

        _chai.expect.call(void 0, null || undefined).to.be.not.equal(token)
        _chai.expect.call(void 0, 3600).to.be.equal(expiresIn)
        _chai.expect.call(void 0, undefined).to.be.equal(password)
      })
  })

  _mocha.it.call(void 0, 'Should return status code 401 from authentication failed', (done) => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/session/authentication')
      .send({
        email: 'guest@gmail.com',
        password: '123'
      })
      .expect(401, done)
  })

  _mocha.it.call(void 0, 'Validation consistency', () => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/session/authentication')
      .send()
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('Deve conter um email válido')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('email')
        _chai.expect.call(void 0, errors[0].location).to.be.equal('body')

        _chai.expect.call(void 0, errors[1].msg).to.be.equal('O campo password é obrigatório')
        _chai.expect.call(void 0, errors[1].param).to.be.equal('password')
        _chai.expect.call(void 0, errors[1].location).to.be.equal('body')
      })
  })
})

_mocha.describe.call(void 0, 'Reset password', () => {
  _mocha.it.call(void 0, 'Must be return status code 200', (done) => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/session/reset_password')
      .send({
        email: 'adriano@gmail.com'
      })
      .expect(200, done)
  })

  _mocha.it.call(void 0, 'Email must be not empty', () => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/session/reset_password')
      .expect(422)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('Deve conter um email válido')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('email')
      })
  })

  _mocha.it.call(void 0, 'Required valid email', () => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/session/reset_password')
      .send({
        email: 'guest.com.br'
      })
      .expect(422)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('Deve conter um email válido')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('email')
      })
  })

  _mocha.it.call(void 0, 'Validation when not exists user with email', () => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/session/reset_password')
      .send({
        email: 'adriano_fake@gmail.com.br'
      })
      .expect(422)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('Não existe nenhum usuário com esse email')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('email')
      })
  })
})

_mocha.describe.call(void 0, 'Session register', () => {
  _mocha.it.call(void 0, 'Return user infos after user store successful', () => {
    _supertest2.default.call(void 0, server)
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

        _chai.expect.call(void 0, name).to.be.equal('User Test')
        _chai.expect.call(void 0, email).to.be.equal('new_user_test@gmail.com')
        _chai.expect.call(void 0, password).to.be.equal(undefined)
      })
  })

  _mocha.it.call(void 0, 'Validation consistency', () => {
    _supertest2.default.call(void 0, server)
      .post('/api/v1/session/register')
      .expect(422)
      .end((err, res) => {
        if (err) { throw err }

        const { errors } = res.body

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('O campo nome é obrigatório')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('name')
        _chai.expect.call(void 0, errors[0].location).to.be.equal('body')

        _chai.expect.call(void 0, errors[1].msg).to.be.equal('Deve conter um email válido')
        _chai.expect.call(void 0, errors[1].param).to.be.equal('email')
        _chai.expect.call(void 0, errors[1].location).to.be.equal('body')

        _chai.expect.call(void 0, errors[2].msg).to.be.equal('O campo password é obrigatório')
        _chai.expect.call(void 0, errors[2].param).to.be.equal('password')
        _chai.expect.call(void 0, errors[2].location).to.be.equal('body')
      })
  })

  _mocha.it.call(void 0, 'Required valid email', () => {
    _supertest2.default.call(void 0, server)
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

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('Deve conter um email válido')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('email')
        _chai.expect.call(void 0, errors[0].location).to.be.equal('body')
      })
  })

  _mocha.it.call(void 0, 'Should not pass up a existing email', () => {
    _supertest2.default.call(void 0, server)
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

        _chai.expect.call(void 0, errors[0].msg).to.be.equal('O email já está sendo utilizado')
        _chai.expect.call(void 0, errors[0].param).to.be.equal('email')
        _chai.expect.call(void 0, errors[0].location).to.be.equal('body')
      })
  })
})
