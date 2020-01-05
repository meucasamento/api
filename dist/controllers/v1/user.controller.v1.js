"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _tokenManager = require('../../utils/components/tokenManager'); var _tokenManager2 = _interopRequireDefault(_tokenManager);

class UserController {
  

  constructor (repository) {;UserController.prototype.__init.call(this);UserController.prototype.__init2.call(this);UserController.prototype.__init3.call(this);UserController.prototype.__init4.call(this);
    this.repository = repository
  }

  __init() {this.index = async (req, res, next) => {
    const data = req.body
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    try {
      const users = await this.repository.find(data, page, limit)
      return res.send(users)
    } catch (error) {
      next(error)
    }
  }}

  __init2() {this.findOne = async (req, res, next) => {
    const { id } = req.params

    try {
      const user = await this.repository.findOne({ _id: id })
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }}

  __init3() {this.update = async (req, res, next) => {
    const token = req.headers.authorization
    const { name, email } = req.body

    try {
      const { _id } = await _tokenManager2.default.verify(token)
      const userUpdated = await this.repository.update(_id, { name, email })
      const newToken = _tokenManager2.default.signUser(_id)
      return res.send({
        user: userUpdated,
        token: newToken
      })
    } catch (error) {
      next(error)
    }
  }}

  __init4() {this.changePassword = async (req, res, next) => {
    const token = req.headers.authorization
    const { newPassword } = req.body

    try {
      const { _id } = _tokenManager2.default.verify(token)
      await this.repository.changePassword(_id, newPassword)
      const updatedToken = await _tokenManager2.default.signUser(_id)
      return res.send(updatedToken)
    } catch (error) {
      next(error)
    }
  }}
}

exports. default = UserController
