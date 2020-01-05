"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mocha = require('mocha');
var _chai = require('chai');

var _encryption = require('../utils/encryption'); var _encryption2 = _interopRequireDefault(_encryption);

_mocha.describe.call(void 0, 'Encryption', () => {
  _mocha.it.call(void 0, 'Hash should not equals to value', async () => {
    try {
      const value = '1234567'
      const hash = await _encryption2.default.hash(value)
      _chai.expect.call(void 0, hash).not.equals('1234567')
    } catch (error) {
      _chai.assert.fail(error)
    }
  })

  _mocha.it.call(void 0, 'Hash comparison with origin value should return true', async () => {
    try {
      const value = 'ab*553'
      const hash = await _encryption2.default.hash(value)
      const compare = await _encryption2.default.compare(value, hash)
      _chai.assert.isTrue(compare)
    } catch (error) {
      _chai.assert.fail(error)
    }
  })

  _mocha.it.call(void 0, 'Hash comparison with false origin value should return false', async () => {
    try {
      const value = 'ab*553'
      const hash = await _encryption2.default.hash(value)
      const compare = await _encryption2.default.compare('ab**ˆ%%', hash)
      _chai.assert.isFalse(compare)
    } catch (error) {
      _chai.assert.fail(error)
    }
  })
})
