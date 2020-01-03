"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _routerinterface = require('./../router.interface'); var _routerinterface2 = _interopRequireDefault(_routerinterface);

var _sessioncontrollerv1 = require('./../../controllers/v1/session.controller.v1'); var _sessioncontrollerv12 = _interopRequireDefault(_sessioncontrollerv1);
var _sessionvalidatorv1 = require('./../../validators/v1/session.validator.v1'); var _sessionvalidatorv12 = _interopRequireDefault(_sessionvalidatorv1);


class SessionRouter extends _routerinterface2.default {
    
    

    constructor (repository,
      mailService) {
      super();SessionRouter.prototype.__init.call(this);
      this.controller = new (0, _sessioncontrollerv12.default)(repository, mailService)
      this.validator = new (0, _sessionvalidatorv12.default)(repository)
      this.setup()
    }

     __init() {this.setup = () => {
      this.router.post('/session/authentication', this.validator.authentication, this.validator.validate, this.controller.authentication)
      this.router.post('/session/reset_password', this.validator.resetPassword, this.validator.validate, this.controller.resetPassword)
      this.router.post('/session/register', this.validator.register, this.validator.validate, this.controller.register)
    }}
}

exports. default = SessionRouter
