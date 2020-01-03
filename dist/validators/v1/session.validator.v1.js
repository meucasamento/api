"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _expressvalidator = require('express-validator');
var _requestvalidator = require('../request.validator'); var _requestvalidator2 = _interopRequireDefault(_requestvalidator);


class SessionValidator extends _requestvalidator2.default {
    

    constructor (userRepository) {
      super();SessionValidator.prototype.__init.call(this);SessionValidator.prototype.__init2.call(this);SessionValidator.prototype.__init3.call(this);
      this.userRepository = userRepository
    }

    __init() {this.authentication = [
      _expressvalidator.check.call(void 0, 'email').isEmail().withMessage('Deve conter um email válido'),
      _expressvalidator.check.call(void 0, 'password').exists().withMessage('O campo password é obrigatório')
    ]}

    __init2() {this.register = [
      _expressvalidator.check.call(void 0, 'name').exists().withMessage('O campo nome é obrigatório'),
      _expressvalidator.check.call(void 0, 'email').isEmail().bail().withMessage('Deve conter um email válido')
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
      _expressvalidator.check.call(void 0, 'password').exists().withMessage('O campo password é obrigatório')
    ]}

    __init3() {this.resetPassword = [
      _expressvalidator.check.call(void 0, 'email').isEmail().withMessage('Deve conter um email válido').bail()
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
    ]}
}

exports. default = SessionValidator
