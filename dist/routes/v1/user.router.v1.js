"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_interface_1 = __importDefault(require("../router.interface"));
const user_controller_v1_1 = __importDefault(require("../../controllers/v1/user.controller.v1"));
const auth_middleware_v1_1 = __importDefault(require("../../middlewares/v1/auth.middleware.v1"));
const user_validator_v1_1 = __importDefault(require("./../../validators/v1/user.validator.v1"));
class UserRoutes extends router_interface_1.default {
    constructor(repository) {
        super();
        this.setup = () => {
            this.router.use('/users', auth_middleware_v1_1.default.checkToken);
            this.router.get('/users', this.controller.index);
            this.router.get('/users/:id', this.validator.findOne, this.validator.validate, this.controller.findOne);
            this.router.patch('/users', this.validator.update, this.validator.validate, this.controller.update);
            this.router.patch('/users/change_password', this.validator.changePassword, this.validator.validate, this.controller.changePassword);
        };
        this.controller = new user_controller_v1_1.default(repository);
        this.validator = new user_validator_v1_1.default(repository);
        this.setup();
    }
}
exports.default = UserRoutes;
//# sourceMappingURL=user.router.v1.js.map