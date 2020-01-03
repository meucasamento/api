"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _errorexception = require('./error.exception'); var _errorexception2 = _interopRequireDefault(_errorexception);

class NotImplemetedException extends _errorexception2.default {
  constructor () {
    super('Method not implemented.', 501)
  }
}

exports. default = new NotImplemetedException()
