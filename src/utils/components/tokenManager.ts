import jwt from 'jsonwebtoken'
import config from './../../config'

interface TokenPayloadInterface {
  id: string
}

interface TokenResponseInterface {
  token: string,
  expiresIn: number
}

class TokenManager {
  verify (token: string): TokenPayloadInterface {
    if (token.startsWith(config.authorizationPrefix)) {
      token = token.slice(config.authorizationPrefix.length, token.length)
    }

    const secret = config.secret
    const data = jwt.verify(token, secret)
    return data as TokenPayloadInterface
  }

  sign (object: TokenPayloadInterface): TokenResponseInterface {
    const expiresIn = config.tokenExpireTime
    const secret = config.secret
    const token = jwt.sign(object, secret, {
      expiresIn: expiresIn,
      algorithm: 'HS512'
    })
    return { token, expiresIn }
  }

  signUser (id: string): TokenResponseInterface {
    return this.sign({ id })
  }
}

export default new TokenManager()
