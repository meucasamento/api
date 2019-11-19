import { Request, Response, NextFunction } from 'express'
import TokenManager from '../../utils/components/tokenManager'
import NoPermissionException from './../../exceptions/noPermission.exception'

class AuthMiddleware {
  public async checkToken (req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization

    if (!token) {
      next(NoPermissionException)
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
