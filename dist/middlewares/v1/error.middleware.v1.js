"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


class ErrorMiddleware {
  checkError (error, re, res, next) {
    const message = error.message
    const status = (error ).status || 500
    res.status(status).send({ message })
  }
}

exports. default = new ErrorMiddleware()
