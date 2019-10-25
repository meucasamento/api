import { check } from 'express-validator'
import RequestValidator from '../request.validator'

class GuestRequestValidator extends RequestValidator {
  store = [
    check('email').isEmail().withMessage('O campo email deve conter um email válido'),
    this.validate
  ]
}

export default new GuestRequestValidator()
