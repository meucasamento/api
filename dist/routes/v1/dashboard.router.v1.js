"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _routerinterface = require('../router.interface'); var _routerinterface2 = _interopRequireDefault(_routerinterface);
var _dashboardcontrollerv1 = require('../../controllers/v1/dashboard.controller.v1'); var _dashboardcontrollerv12 = _interopRequireDefault(_dashboardcontrollerv1);

var _authmiddlewarev1 = require('../../middlewares/v1/auth.middleware.v1'); var _authmiddlewarev12 = _interopRequireDefault(_authmiddlewarev1);

class DashboardRouter extends _routerinterface2.default {
    

    constructor (repository) {
      super();DashboardRouter.prototype.__init.call(this);
      this.controller = new (0, _dashboardcontrollerv12.default)(repository)
      this.setup()
    }

     __init() {this.setup = () => {
      this.router.use('/dashboard', _authmiddlewarev12.default.checkToken)
      this.router.get('/dashboard/report', this.controller.report)
    }}
}

exports. default = DashboardRouter
