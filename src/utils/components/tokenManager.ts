import jwt from 'jsonwebtoken'

class TokenManager {
  verify (
    token: string,
    secret: string): object | string {
    return jwt.verify(token, secret)
  }

  sign (payload: string | Buffer | object, secret: string, expiresIn: string | number = '1h'): string {
    return jwt.sign(payload, secret, {
      expiresIn,
      algorithm: 'HS512'
    })
  }
}

export default new TokenManager()
