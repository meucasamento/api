import { Request, Response, NextFunction, RequestHandler } from 'express'
import { validate, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'

import ErrorException from './../../exceptions/error.exception'

function validationMiddleware<T> (type: any, skipMissingProperties = false): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ')
          next(new ErrorException(message, 400))
        } else {
          next()
        }
      })
  }
}

export default validationMiddleware
