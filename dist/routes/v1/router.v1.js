"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_interface_1 = __importDefault(require("../router.interface"));
const user_router_v1_1 = __importDefault(require("./user.router.v1"));
const guest_router_v1_1 = __importDefault(require("./guest.router.v1"));
const dashboard_router_v1_1 = __importDefault(require("./dashboard.router.v1"));
const session_router_v1_1 = __importDefault(require("./session.router.v1"));
class RouterV1 extends router_interface_1.default {
    constructor(repositoryFactory, mailService) {
        super();
        this.routers = [
            new user_router_v1_1.default(repositoryFactory.userRepository),
            new guest_router_v1_1.default(repositoryFactory.guestRepository),
            new dashboard_router_v1_1.default(repositoryFactory.dashboardRepository),
            new session_router_v1_1.default(repositoryFactory.userRepository, mailService)
        ];
        this.setup();
    }
    setup() {
        this.routers.forEach(item => {
            this.router.use(item.router);
        });
    }
}
exports.default = RouterV1;
//# sourceMappingURL=router.v1.js.map