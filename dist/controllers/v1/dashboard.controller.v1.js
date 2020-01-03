"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


class DashboardController {
    

    constructor (repository) {;DashboardController.prototype.__init.call(this);
      this.repository = repository
    }

    __init() {this.report = async (req, res, next) => {
      try {
        const report = await this.repository.report()
        return res.send(report)
      } catch (error) {
        next(error)
      }
    }}
}

exports. default = DashboardController
