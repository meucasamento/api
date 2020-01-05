"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MailServiceMock  {
  send (email, subject, body) {
    return Promise.resolve()
  }
}

exports. default = new MailServiceMock()
