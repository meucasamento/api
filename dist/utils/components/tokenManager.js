"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var jwt = _interopRequireWildcard(_jsonwebtoken);
var _env = require('./../../config/env'); var _env2 = _interopRequireDefault(_env);










class TokenManager {
  verify (token) {
    if (token.startsWith(_env2.default.authorizationPrefix)) {
      token = token.slice(_env2.default.authorizationPrefix.length, token.length)
    }

    const secret = _env2.default.secret
    const data = jwt.verify(token, secret)
    return data 
  }

  sign (object) {
    const expiresIn = _env2.default.tokenExpireTime
    const secret = _env2.default.secret
    const token = jwt.sign(object, secret, {
      expiresIn: expiresIn,
      algorithm: 'HS512'
    })
    return { token, expiresIn }
  }

  signUser (id) {
    return this.sign({ _id: id })
  }
}

exports. default = new TokenManager()
