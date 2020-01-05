"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _errorexception = require('./error.exception'); var _errorexception2 = _interopRequireDefault(_errorexception);

class NotFoundException extends _errorexception2.default {
  constructor () {
    super('Not found', 404)
  }
}

exports. default = new NotFoundException()
