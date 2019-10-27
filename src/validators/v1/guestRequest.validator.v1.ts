import { check, param } from 'express-validator'
import RequestValidator from '../request.validator'
import GuestRepositoryInterface from './../../repositories/guests/guestRepository.interface'

class GuestRequestValidator extends RequestValidator {
  private guestRepository: GuestRepositoryInterface

  constructor (guestRepository: GuestRepositoryInterface) {
    super()
    this.guestRepository = guestRepository
  }

  store = [
    check('name')
      .exists().withMessage('O campo nome é obrigatório')
      .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres')
      .custom(name => {
        return this.guestRepository.exists({ name }).then(exists => {
          return !exists ? Promise.resolve() : Promise.reject(new Error(`O nome ${name} já está sendo utilizado`))
        }).catch(err => {
          return Promise.reject(err)
        })
      }),
    check('email')
      .optional()
      .isEmail().bail().withMessage('Deve conter um email válido')
      .custom(email => {
        return this.guestRepository.exists({ email }).then(exists => {
          return !exists ? Promise.resolve() : Promise.reject(new Error(`O email ${email} já está sendo utilizado`))
        }).catch(err => {
          return Promise.reject(err)
        })
      }),
    this.validate
  ]

  update = [
    param('id', 'O id do convidado é obrigatório').exists(),
    this.validate
  ]
}

export default GuestRequestValidator
