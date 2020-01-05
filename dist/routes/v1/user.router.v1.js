"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _routerinterface = require('../router.interface'); var _routerinterface2 = _interopRequireDefault(_routerinterface);

var _usercontrollerv1 = require('../../controllers/v1/user.controller.v1'); var _usercontrollerv12 = _interopRequireDefault(_usercontrollerv1);
var _authmiddlewarev1 = require('../../middlewares/v1/auth.middleware.v1'); var _authmiddlewarev12 = _interopRequireDefault(_authmiddlewarev1);
var _uservalidatorv1 = require('./../../validators/v1/user.validator.v1'); var _uservalidatorv12 = _interopRequireDefault(_uservalidatorv1);

class UserRoutes extends _routerinterface2.default {
    
    

    constructor (repository) {
      super();UserRoutes.prototype.__init.call(this);
      this.controller = new (0, _usercontrollerv12.default)(repository)
      this.validator = new (0, _uservalidatorv12.default)(repository)
      this.setup()
    }

     __init() {this.setup = () => {
      this.router.use('/users', _authmiddlewarev12.default.checkToken)
      this.router.get('/users', this.controller.index)
      this.router.get('/users/:id', this.validator.findOne, this.validator.validate, this.controller.findOne)
      this.router.patch('/users', this.validator.update, this.validator.validate, this.controller.update)
      this.router.patch('/users/change_password', this.validator.changePassword, this.validator.validate, this.controller.changePassword)
    }}
}

exports. default = UserRoutes
