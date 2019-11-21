import { it, describe } from 'mocha'
import { assert, expect } from 'chai'

import tokenManager from '../utils/components/tokenManager'

describe('TokenManager', () => {
  it('Should generate token hash and time expiration', () => {
    try {
      const user = { id: 'ab123', name: 'Adriano' }
      const { token, expiresIn } = tokenManager.sign(user)
      expect(token).not.equal(null)
      expect(expiresIn).not.equals(null)
    } catch (error) {
      assert.fail(error)
    }
  })

  it('Extract correctly id from token hash', () => {
    try {
      const user = { id: 'ab123', name: 'Adriano' }
      const { token } = tokenManager.sign(user)
      const tokenData = tokenManager.verify(token)
      expect(tokenData.id).to.be.equal('ab123')
    } catch (error) {
      assert.fail(error)
    }
  })

  it('Extract correctly user id from token hash', () => {
    try {
      const { token } = tokenManager.signUser('ab123')
      const tokenData = tokenManager.verify(token)
      expect(tokenData.id).to.be.equal('ab123')
    } catch (error) {
      assert.fail(error)
    }
  })

  it('Must be not extract data from invalid token', () => {
    try {
      const user = { id: 'ab123', name: 'Adriano' }
      const { token } = tokenManager.sign(user)
      tokenManager.verify(token + 'sdfsdf')
      assert.fail()
    } catch {
      expect(true)
    }
  })
})
