/* eslint-disable no-undef */
import encryption from './../utils/encryption'

test('Hash should not equals to value', async () => {
  try {
    const value = '1234567'
    const hash = await encryption.hash(value)
    expect(hash).not.toBe('1234567')
  } catch (error) {
    fail(error)
  }
})

test('Hash comparison with origin value should return true', async () => {
  try {
    const value = 'ab*553'
    const hash = await encryption.hash(value)
    const compare = await encryption.compare(value, hash)
    expect(compare).toBeTruthy()
  } catch (error) {
    fail(error)
  }
})

test('Hash comparison with false origin value should return false', async () => {
  try {
    const value = 'ab*553'
    const hash = await encryption.hash(value)
    const compare = await encryption.compare('ab**ˆ%%', hash)
    expect(compare).toBeFalsy()
  } catch (error) {
    fail(error)
  }
})
