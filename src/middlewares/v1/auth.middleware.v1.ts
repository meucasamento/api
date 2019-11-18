import { Request, Response, NextFunction } from 'express'
import Config from './../../config'
import TokenManager from '../../utils/components/tokenManager'
import NoPermissionException from './../../exceptions/noPermission.exception'

class AuthMiddleware {
  public async checkToken (req: Request, res: Response, next: NextFunction): Promise<void> {
    let token = req.headers.authorization

    if (!token) {
      next(NoPermissionException)
    }

    if (token.startsWith(Config.authorizationPrefix)) {
      token = token.slice(Config.authorizationPrefix.length, token.length)
    }

    try {
      TokenManager.verify(token)
      next()
    } catch {
      next(NoPermissionException)
    }
  }
}

export default new AuthMiddleware()
