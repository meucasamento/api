/* eslint-disable no-undef */
import { assert, expect } from 'chai'

import encryption from '../utils/encryption'

describe('Encryption', () => {
  it('Hash should not equals to value', async () => {
    try {
      const value = '1234567'
      const hash = await encryption.hash(value)
      expect(hash).not.equals('1234567')
    } catch (error) {
      assert.fail(error)
    }
  })

  it('Hash comparison with origin value should return true', async () => {
    try {
      const value = 'ab*553'
      const hash = await encryption.hash(value)
      const compare = await encryption.compare(value, hash)
      assert.isTrue(compare)
    } catch (error) {
      assert.fail(error)
    }
  })

  it('Hash comparison with false origin value should return false', async () => {
    try {
      const value = 'ab*553'
      const hash = await encryption.hash(value)
      const compare = await encryption.compare('ab**ˆ%%', hash)
      assert.isFalse(compare)
    } catch (error) {
      assert.fail(error)
    }
  })
})
