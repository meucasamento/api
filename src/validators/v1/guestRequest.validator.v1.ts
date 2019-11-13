import { check, param } from 'express-validator'
import RequestValidator from '../request.validator'
import GuestRepositoryInterface from './../../repositories/guests/guestRepository.interface'

class GuestRequestValidator extends RequestValidator {
  private guestRepository: GuestRepositoryInterface

  constructor (guestRepository: GuestRepositoryInterface) {
    super()
    this.guestRepository = guestRepository
  }

  findOne = [
    param('id')
      .exists().withMessage('O campo id é obrigatório')
      .custom(id => {
        return this.guestRepository.exists({ _id: id }).then((exists) => {
          if (!exists) {
            throw new Error('O convidado não existe')
          }
          return true
        }).catch((error) => {
          throw error
        })
      })
  ]

  store = [
    check('name')
      .exists().withMessage('O campo nome é obrigatório')
      .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres')
      .custom(name => {
        return this.guestRepository.exists({ name }).then(exists => {
          if (exists) {
            throw new Error('Já existe outro convidado com esse nome')
          }
          return true
        }).catch(error => {
          throw error
        })
      }),
    check('phone')
      .optional()
      .isString(),
    check('isActive')
      .optional()
      .isBoolean(),
    check('isConfirmed')
      .optional()
      .isBoolean(),
    check('isGodfather')
      .optional()
      .isBoolean(),
    check('email')
      .optional()
      .isEmail().bail().withMessage('Deve conter um email válido')
      .custom(email => {
        return this.guestRepository.exists({ email }).then(exists => {
          if (exists) {
            throw new Error('O email já está sendo utilizado')
          }
          return true
        }).catch(error => {
          throw error
        })
      })
  ]

  update = this.findOne.concat(this.store)

  invitation = this.findOne.concat([
    check('status')
      .exists().withMessage('O campo status é obrigatório')
      .isBoolean().withMessage('O campo status deve conter um valor do tipo boolean')
  ])

  active = this.invitation

  delete = this.findOne
}

export default GuestRequestValidator
