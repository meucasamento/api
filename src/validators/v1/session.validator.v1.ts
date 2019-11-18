import { check } from 'express-validator'
import RequestValidator from '../request.validator'
import UserRepositoryInterface from './../../repositories/users/userRepository.interface'

class SessionValidator extends RequestValidator {
    private userRepository: UserRepositoryInterface

    constructor (userRepository: UserRepositoryInterface) {
      super()
      this.userRepository = userRepository
    }

    authentication = [
      check('email').isEmail().withMessage('Deve conter um email válido'),
      check('password').exists()
    ]

    register = [
      check('name').exists(),
      check('email').isEmail().bail().withMessage('Deve conter um email válido')
        .custom((email) => {
          return this.userRepository.exists({ email }).then(exists => {
            if (exists) {
              throw new Error('O email já está sendo utilizado')
            }
            return true
          }).catch(error => {
            throw error
          })
        }),
      check('password').exists().withMessage('O campo password é obrigatório')
    ]

    resetPassword = [
      check('email').isEmail().withMessage('Deve conter um email válido').bail()
        .custom((email) => {
          return this.userRepository.exists({ email }).then(exists => {
            if (!exists) {
              throw new Error('Não existe nenhum usuário com esse email')
            }
            return true
          }).catch(error => {
            throw error
          })
        })
    ]
}

export default SessionValidator
