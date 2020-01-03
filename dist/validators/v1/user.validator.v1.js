"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _expressvalidator = require('express-validator');
var _requestvalidator = require('./../request.validator'); var _requestvalidator2 = _interopRequireDefault(_requestvalidator);

var _tokenManager = require('./../../utils/components/tokenManager'); var _tokenManager2 = _interopRequireDefault(_tokenManager);

class UserValidator extends _requestvalidator2.default {
  

  constructor (userRepository) {
    super();UserValidator.prototype.__init.call(this);UserValidator.prototype.__init2.call(this);UserValidator.prototype.__init3.call(this);
    this.userRepository = userRepository
  }

  __init() {this.findOne = [
    _expressvalidator.param.call(void 0, 'id')
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
  ]}

  __init2() {this.update = [
    _expressvalidator.check.call(void 0, 'name')
      .exists().withMessage('O campo nome é obrigatório')
      .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres'),
    _expressvalidator.check.call(void 0, 'email')
      .isEmail().bail().withMessage('Deve conter um email válido')
      .custom((email, { req }) => {
        const { _id } = _tokenManager2.default.verify(req.headers.authorization)
        return this.userRepository.findOne({ email }).then(user => {
          if (!user || user.id === _id) {
            return true
          } else {
            throw new Error('O email já está sendo utilizado')
          }
        }).catch(error => {
          throw error
        })
      })
  ]}

  __init3() {this.changePassword = [
    _expressvalidator.check.call(void 0, 'newPassword').exists()
  ]}
}

exports. default = UserValidator
