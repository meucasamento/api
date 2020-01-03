"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mocha = require('mocha');
var _chai = require('chai');

var _tokenManager = require('../utils/components/tokenManager'); var _tokenManager2 = _interopRequireDefault(_tokenManager);

_mocha.describe.call(void 0, 'TokenManager', () => {
  _mocha.it.call(void 0, 'Should generate token hash and time expiration', () => {
    try {
      const user = { _id: 'ab123', name: 'Adriano' }
      const { token, expiresIn } = _tokenManager2.default.sign(user)
      _chai.expect.call(void 0, token).not.equal(null)
      _chai.expect.call(void 0, expiresIn).not.equals(null)
    } catch (error) {
      _chai.assert.fail(error)
    }
  })

  _mocha.it.call(void 0, 'Extract correctly id from token hash', () => {
    try {
      const user = { _id: 'ab123', name: 'Adriano' }
      const { token } = _tokenManager2.default.sign(user)
      const tokenData = _tokenManager2.default.verify(token)
      _chai.expect.call(void 0, tokenData._id).to.be.equal('ab123')
    } catch (error) {
      _chai.assert.fail(error)
    }
  })

  _mocha.it.call(void 0, 'Extract correctly user id from token hash', () => {
    try {
      const { token } = _tokenManager2.default.signUser('ab123')
      const tokenData = _tokenManager2.default.verify(token)
      _chai.expect.call(void 0, tokenData._id).to.be.equal('ab123')
    } catch (error) {
      _chai.assert.fail(error)
    }
  })

  _mocha.it.call(void 0, 'Must be not extract data from invalid token', () => {
    try {
      const user = { _id: 'ab123', name: 'Adriano' }
      const { token } = _tokenManager2.default.sign(user)
      _tokenManager2.default.verify(token + 'sdfsdf')
      _chai.assert.fail()
    } catch (e) {
      _chai.expect.call(void 0, true)
    }
  })
})
