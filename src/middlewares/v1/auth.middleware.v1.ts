import { Request, Response, NextFunction } from 'express'
import TokenManager from '../../utils/components/tokenManager'
// import NoPermissionException from './../../exceptions/noPermission.exception'

class AuthMiddleware {
  public async checkToken (req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization

    if (!token) {
      res.status(401).send()
    }

    try {
      TokenManager.verify(token)
      next()
    } catch {
      res.status(401).send()
    }
  }
}

export default new AuthMiddleware()
