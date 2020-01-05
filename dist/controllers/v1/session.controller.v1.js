"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var _tokenManager = require('../../utils/components/tokenManager'); var _tokenManager2 = _interopRequireDefault(_tokenManager);

var _encryption = require('./../../utils/encryption'); var _encryption2 = _interopRequireDefault(_encryption);


class SessionController {
  
  

  constructor (userRepository,
    mailService) {;SessionController.prototype.__init.call(this);SessionController.prototype.__init2.call(this);SessionController.prototype.__init3.call(this);
    this.userRepository = userRepository
    this.mailService = mailService
  }

  __init() {this.register = async (req, res, next) => {
    const {
      name,
      email,
      password
    } = req.body

    try {
      const user = await this.userRepository.store({
        name,
        email,
        password: password
      } )
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }}

  __init2() {this.authentication = async (req, res, next) => {
    const {
      email,
      password
    } = req.body

    try {
      const user = await this.userRepository.findOne({ email }, '+password')

      if (!user) {
        return res.status(401).send()
      }

      const mathPassword = await _encryption2.default.compare(password, user.password)

      if (mathPassword) {
        const data = _tokenManager2.default.signUser(user.id)
        return res.send(data)
      } else {
        return res.status(401).send()
      }
    } catch (error) {
      next(error)
    }
  }}

  __init3() {this.resetPassword = async (req, res, next) => {
    const { email } = req.body
    try {
      const randomString = Math.random().toString(36).slice(-8)
      const encryptedPassword = await _encryption2.default.hash(randomString)
      const { id } = await this.userRepository.findOne({ email })
      await this.userRepository.update(id, { password: encryptedPassword })
      await this.mailService.send(email,
        'Reset de senha',
        `Sua senha foi resetada com sucesso, para acesso temporário você deve usar a senha temporária: <strong>${randomString}</strong>.`)
      return res.send()
    } catch (error) {
      next(error)
    }
  }}
}

exports. default = SessionController
