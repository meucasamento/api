import { check, param } from 'express-validator'
import RequestValidator from './../request.validator'
import UserRepositoryInterface from '../../repositories/users/userRepository.interface'
import TokenManager from './../../utils/components/tokenManager'

class UserValidator extends RequestValidator {
  private userRepository: UserRepositoryInterface

  constructor (userRepository: UserRepositoryInterface) {
    super()
    this.userRepository = userRepository
  }

  findOne = [
    param('id')
      .exists().withMessage('O campo id é obrigatório')
      // .matches('/^[0-9a-fA-F]{12}$/').withMessage('O deve estar no formáto válido')
      .custom(id => {
        return this.userRepository.exists({ _id: id }).then((exists) => {
          if (!exists) {
            throw new Error('O usuário não existe')
          }
          return true
        }).catch((error) => {
          throw error
        })
      })
  ]

  update = [
    check('name')
      .exists().withMessage('O campo nome é obrigatório')
      .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres'),
    check('email')
      .isEmail().bail().withMessage('Deve conter um email válido')
      .custom((email, { req }) => {
        const { id } = TokenManager.verify(req.headers.authorization)
        return this.userRepository.findOne({ email }).then(user => {
          if (!user || user.id === id) {
            return true
          } else {
            throw new Error('O email já está sendo utilizado')
          }
        }).catch(error => {
          throw error
        })
      })
  ]

  changePassword = [
    check('newPassword').exists()
  ]
}

export default UserValidator
