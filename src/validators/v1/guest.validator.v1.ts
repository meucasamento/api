import { check } from 'express-validator'
import RequestValidator from '../request.validator'
import GuestRepositoryInterface from '../../repositories/guests/guestRepository.interface'

class GuestValidator extends RequestValidator {
  private guestRepository: GuestRepositoryInterface

  constructor (guestRepository: GuestRepositoryInterface) {
    super()
    this.guestRepository = guestRepository
  }

  store = [
    check('name')
      .exists().withMessage('O campo nome é obrigatório')
      .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres'),
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
    check('isFamily')
      .optional()
      .isBoolean(),
    check('email')
      .optional()
      .isEmail().bail().withMessage('Deve conter um email válido')
      .custom((email) => {
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

  update = [
    check('name')
      .exists().withMessage('O campo nome é obrigatório')
      .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres'),
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
    check('isFamily')
      .optional()
      .isBoolean(),
    check('email')
      .optional()
      .isEmail().bail().withMessage('Deve conter um email válido')
      .custom((email, { req }) => {
        const { id } = req.params

        return this.guestRepository.findOne({ email }).then(guest => {
          if (!guest || guest.id === id) {
            return true
          }
          throw new Error('O email já está sendo utilizado')
        }).catch(error => {
          throw error
        })
      })
  ]

  invitation = [
    check('status')
      .exists().withMessage('O campo status é obrigatório')
      .isBoolean().withMessage('O campo status deve conter um valor do tipo boolean')
  ]

  active = this.invitation
}

export default GuestValidator
