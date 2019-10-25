import { Request, Response, NextFunction } from 'express'
import { ValidationError, validationResult, Result } from 'express-validator'

export default abstract class RequestValidator {
  protected validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors: Result<ValidationError> = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
    } else {
      next()
    }
  }
}
