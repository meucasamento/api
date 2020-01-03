"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _expressvalidator = require('express-validator');

 class RequestValidator {constructor() { RequestValidator.prototype.__init.call(this); }
  __init() {this.validate = (req, res, next) => {
    const errors = _expressvalidator.validationResult.call(void 0, req)

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
    } else {
      next()
    }
  }}
} exports.default = RequestValidator;
