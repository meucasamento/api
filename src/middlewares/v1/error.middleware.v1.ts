import { NextFunction, Request, Response } from 'express'
import ErrorException from './../../exceptions/error.exception'

class ErrorMiddleware {
  checkError (error: Error | ErrorException, re: Request, res: Response, next: NextFunction): void {
    const message = error.message
    const status = (error as ErrorException).status || 500
    res.status(status).send({ message })
  }
}

export default new ErrorMiddleware()
