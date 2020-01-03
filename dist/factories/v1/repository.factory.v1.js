"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }





var _dashboardRepository = require('../../repositories/dashboard/dashboardRepository'); var _dashboardRepository2 = _interopRequireDefault(_dashboardRepository);
var _userRepository = require('../../repositories/users/userRepository'); var _userRepository2 = _interopRequireDefault(_userRepository);
var _guestRepository = require('../../repositories/guests/guestRepository'); var _guestRepository2 = _interopRequireDefault(_guestRepository);

class RepositoriesFactory  {constructor() { RepositoriesFactory.prototype.__init.call(this);RepositoriesFactory.prototype.__init2.call(this);RepositoriesFactory.prototype.__init3.call(this); }
    __init() {this.dashboardRepository = _dashboardRepository2.default}
    __init2() {this.userRepository = _userRepository2.default}
    __init3() {this.guestRepository = _guestRepository2.default}
}

exports. default = new RepositoriesFactory()
