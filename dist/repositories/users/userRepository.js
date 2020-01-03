"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _usermodelv1 = require('./../../models/v1/users/user.model.v1'); var _usermodelv12 = _interopRequireDefault(_usermodelv1);

var _baseRepository = require('./../base/baseRepository'); var _baseRepository2 = _interopRequireDefault(_baseRepository);
var _encryption = require('./../../utils/encryption'); var _encryption2 = _interopRequireDefault(_encryption);

class UserRepository extends _baseRepository2.default {
  constructor () {
    super(_usermodelv12.default);UserRepository.prototype.__init.call(this);UserRepository.prototype.__init2.call(this);
  }

  __init() {this.store = async (object) => {
    try {
      object.password = await _encryption2.default.hash(object.password)
      const user = await this.model.create(object)
      user.password = undefined
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }}

  __init2() {this.changePassword = async (id, newPassword) => {
    try {
      const encryptedPassword = await _encryption2.default.hash(newPassword)
      await this.update(id, { password: encryptedPassword })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }}
}

exports. default = new UserRepository()
