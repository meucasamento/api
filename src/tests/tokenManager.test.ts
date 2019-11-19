/* eslint-disable no-undef */
import tokenManager from './../utils/components/tokenManager'

test('Should generate token hash and time expiration', async () => {
  const user = { id: 'ab123', name: 'Adriano' }
  const { token, expiresIn } = tokenManager.sign(user)
  expect(token).not.toBe(user)
  expect(token).not.toBeNull()
  expect(expiresIn).not.toBeNull()
})

test('Extract correctly id from token hash', async () => {
  const user = { id: 'ab123', name: 'Adriano' }
  const { token } = tokenManager.sign(user)
  const tokenData = tokenManager.verify(token)
  expect(tokenData.id).toBe('ab123')
})

test('Extract correctly user id from token hash', async () => {
  const { token } = tokenManager.signUser('ab123')
  const tokenData = tokenManager.verify(token)
  expect(tokenData.id).toBe('ab123')
})
