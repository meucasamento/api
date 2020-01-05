"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mailgunjs = require('mailgun-js'); var _mailgunjs2 = _interopRequireDefault(_mailgunjs);

var _env = require('./../../../config/env'); var _env2 = _interopRequireDefault(_env);

class MailgunService  {
  async send (email, subject, body) {
    const mailgun = new (0, _mailgunjs2.default)({
      apiKey: _env2.default.mailgunApiKey,
      domain: _env2.default.mailgunDomain
    })
    try {
      await mailgun.messages().send({
        from: 'adrianosouzacostaios@gmail.com',
        to: email,
        subject: subject,
        html: body
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

exports. default = new MailgunService()
