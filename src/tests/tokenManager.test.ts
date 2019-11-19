/* eslint-disable no-undef */
import tokenManager from './../utils/components/tokenManager'

test('Should generate token hash and time expiration', async () => {
  try {
    const user = { id: 'ab123', name: 'Adriano' }
    const { token, expiresIn } = tokenManager.sign(user)
    expect(token).not.toBe(user)
    expect(token).not.toBeNull()
    expect(expiresIn).not.toBeNull()
  } catch (error) {
    fail(error)
  }
})

test('Extract correctly id from token hash', async () => {
  try {
    const user = { id: 'ab123', name: 'Adriano' }
    const { token } = tokenManager.sign(user)
    const tokenData = tokenManager.verify(token)
    expect(tokenData.id).toBe('ab123')
  } catch (error) {
    fail(error)
  }
})

test('Extract correctly user id from token hash', async () => {
  try {
    const { token } = tokenManager.signUser('ab123')
    const tokenData = tokenManager.verify(token)
    expect(tokenData.id).toBe('ab123')
  } catch (error) {
    fail(error)
  }
})

test('Must be not extract data from invalid token', async () => {
  try {
    const user = { id: 'ab123', name: 'Adriano' }
    const { token } = tokenManager.sign(user)
    tokenManager.verify(token + 'sdfsdf')
    fail()
  } catch {
    expect(true)
  }
})
