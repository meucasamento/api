"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _expressvalidator = require('express-validator');
var _requestvalidator = require('../request.validator'); var _requestvalidator2 = _interopRequireDefault(_requestvalidator);


class GuestValidator extends _requestvalidator2.default {
  

  constructor (guestRepository) {
    super();GuestValidator.prototype.__init.call(this);GuestValidator.prototype.__init2.call(this);GuestValidator.prototype.__init3.call(this);GuestValidator.prototype.__init4.call(this);
    this.guestRepository = guestRepository
  }

  __init() {this.store = [
    _expressvalidator.check.call(void 0, 'name')
      .exists().withMessage('O campo nome é obrigatório')
      .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres'),
    _expressvalidator.check.call(void 0, 'phone')
      .optional()
      .isString(),
    _expressvalidator.check.call(void 0, 'isActive')
      .optional()
      .isBoolean(),
    _expressvalidator.check.call(void 0, 'isConfirmed')
      .optional()
      .isBoolean(),
    _expressvalidator.check.call(void 0, 'isGodfather')
      .optional()
      .isBoolean(),
    _expressvalidator.check.call(void 0, 'email')
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
  ]}

  __init2() {this.update = [
    _expressvalidator.check.call(void 0, 'name')
      .exists().withMessage('O campo nome é obrigatório')
      .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres'),
    _expressvalidator.check.call(void 0, 'phone')
      .optional()
      .isString(),
    _expressvalidator.check.call(void 0, 'isActive')
      .optional()
      .isBoolean(),
    _expressvalidator.check.call(void 0, 'isConfirmed')
      .optional()
      .isBoolean(),
    _expressvalidator.check.call(void 0, 'isGodfather')
      .optional()
      .isBoolean(),
    _expressvalidator.check.call(void 0, 'email')
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
  ]}

  __init3() {this.invitation = [
    _expressvalidator.check.call(void 0, 'status')
      .exists().withMessage('O campo status é obrigatório')
      .isBoolean().withMessage('O campo status deve conter um valor do tipo boolean')
  ]}

  __init4() {this.active = this.invitation}
}

exports. default = GuestValidator
