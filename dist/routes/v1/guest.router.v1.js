"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _routerinterface = require('../router.interface'); var _routerinterface2 = _interopRequireDefault(_routerinterface);
var _guestcontrollerv1 = require('../../controllers/v1/guest.controller.v1'); var _guestcontrollerv12 = _interopRequireDefault(_guestcontrollerv1);
var _authmiddlewarev1 = require('../../middlewares/v1/auth.middleware.v1'); var _authmiddlewarev12 = _interopRequireDefault(_authmiddlewarev1);
var _guestvalidatorv1 = require('../../validators/v1/guest.validator.v1'); var _guestvalidatorv12 = _interopRequireDefault(_guestvalidatorv1);

class GuestRouter extends _routerinterface2.default {
  
  

  constructor (repository) {
    super();GuestRouter.prototype.__init.call(this);
    this.controller = new (0, _guestcontrollerv12.default)(repository)
    this.validator = new (0, _guestvalidatorv12.default)(repository)
    this.setup()
  }

   __init() {this.setup = () => {
    this.router.use('/guests', _authmiddlewarev12.default.checkToken)
    this.router.get('/guests', this.controller.index)
    this.router.get('/guests/:id', this.controller.findOne)
    this.router.post('/guests', this.validator.store, this.validator.validate, this.controller.store)
    this.router.patch('/guests/:id', this.validator.update, this.validator.validate, this.controller.update)
    this.router.patch('/guests/:id/invitation', this.validator.invitation, this.validator.validate, this.controller.invitation)
    this.router.patch('/guests/:id/active', this.validator.active, this.validator.validate, this.controller.active)
    this.router.delete('/guests/:id', this.controller.delete)
  }}
}

exports. default = GuestRouter
