"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

class Encryption {
  async hash (data) {
    return _bcrypt2.default.hash(data, 10)
  }

  async compare (data, encrypted) {
    return _bcrypt2.default.compare(data, encrypted)
  }
}

exports. default = new Encryption()
