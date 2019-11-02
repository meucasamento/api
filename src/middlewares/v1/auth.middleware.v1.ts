import { Request, Response, NextFunction } from 'express'
import config from './../../config'
import tokenHelper from '../../utils/components/tokenManager'
import NoPermissionException from './../../exceptions/noPermission.exception'

class AuthMiddleware {
  public async checkToken (req: Request, res: Response, next: NextFunction): Promise<void> {
    let token = req.headers.authorization

    if (!token) {
      next(NoPermissionException)
    }

    if (token.startsWith(config.authorizationPrefix)) {
      token = token.slice(config.authorizationPrefix.length, token.length)
    }

    try {
      tokenHelper.verify(token)
      next()
    } catch {
      next(NoPermissionException)
    }
  }
}

export default new AuthMiddleware()
