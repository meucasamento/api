import { NextFunction, Request, Response } from 'express'
import ErrorException from './../../exceptions/error.exception'

class ErrorMiddleware {
  checkError (error: ErrorException, re: Request, res: Response, next: NextFunction): void {
    const message = error.message

    if (message) {
      res.status(error.status).send({ message })
    }

    res.status(error.status).send()
  }
}

export default new ErrorMiddleware()
