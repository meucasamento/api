"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _tokenManager = require('../../utils/components/tokenManager'); var _tokenManager2 = _interopRequireDefault(_tokenManager);
// import NoPermissionException from './../../exceptions/noPermission.exception'

class AuthMiddleware {
   async checkToken (req, res, next) {
    const token = req.headers.authorization

    if (!token) {
      res.status(401).send()
    }

    try {
      _tokenManager2.default.verify(token)
      next()
    } catch (e) {
      res.status(401).send()
    }
  }
}

exports. default = new AuthMiddleware()
