"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _classvalidator = require('class-validator');
var _classtransformer = require('class-transformer');

var _errorexception = require('./../../exceptions/error.exception'); var _errorexception2 = _interopRequireDefault(_errorexception);

function validationMiddleware (type, skipMissingProperties = false) {
  return (req, res, next) => {
    _classvalidator.validate.call(void 0, _classtransformer.plainToClass.call(void 0, type, req.body), { skipMissingProperties })
      .then((errors) => {
        if (errors.length > 0) {
          const message = errors.map((error) => Object.values(error.constraints)).join(', ')
          next(new (0, _errorexception2.default)(message, 400))
        } else {
          next()
        }
      })
  }
}

exports. default = validationMiddleware
