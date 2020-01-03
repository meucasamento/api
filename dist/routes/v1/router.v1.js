"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _routerinterface = require('../router.interface'); var _routerinterface2 = _interopRequireDefault(_routerinterface);

var _userrouterv1 = require('./user.router.v1'); var _userrouterv12 = _interopRequireDefault(_userrouterv1);
var _guestrouterv1 = require('./guest.router.v1'); var _guestrouterv12 = _interopRequireDefault(_guestrouterv1);
var _dashboardrouterv1 = require('./dashboard.router.v1'); var _dashboardrouterv12 = _interopRequireDefault(_dashboardrouterv1);
var _sessionrouterv1 = require('./session.router.v1'); var _sessionrouterv12 = _interopRequireDefault(_sessionrouterv1);


class RouterV1 extends _routerinterface2.default {
    

    constructor (repositoryFactory,
      mailService) {
      super()
      this.routers = [
        new (0, _userrouterv12.default)(repositoryFactory.userRepository),
        new (0, _guestrouterv12.default)(repositoryFactory.guestRepository),
        new (0, _dashboardrouterv12.default)(repositoryFactory.dashboardRepository),
        new (0, _sessionrouterv12.default)(repositoryFactory.userRepository, mailService)
      ]
      this.setup()
    }

     setup () {
      this.routers.forEach(item => {
        this.router.use(item.router)
      })
    }
}

exports. default = RouterV1
