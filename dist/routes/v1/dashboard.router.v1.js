"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_interface_1 = __importDefault(require("../router.interface"));
const dashboard_controller_v1_1 = __importDefault(require("../../controllers/v1/dashboard.controller.v1"));
const auth_middleware_v1_1 = __importDefault(require("../../middlewares/v1/auth.middleware.v1"));
class DashboardRouter extends router_interface_1.default {
    constructor(repository) {
        super();
        this.setup = () => {
            this.router.use('/dashboard', auth_middleware_v1_1.default.checkToken);
            this.router.get('/dashboard/report', this.controller.report);
        };
        this.controller = new dashboard_controller_v1_1.default(repository);
        this.setup();
    }
}
exports.default = DashboardRouter;
//# sourceMappingURL=dashboard.router.v1.js.map