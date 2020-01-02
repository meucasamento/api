"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_interface_1 = __importDefault(require("./../router.interface"));
const session_controller_v1_1 = __importDefault(require("./../../controllers/v1/session.controller.v1"));
const session_validator_v1_1 = __importDefault(require("./../../validators/v1/session.validator.v1"));
class SessionRouter extends router_interface_1.default {
    constructor(repository, mailService) {
        super();
        this.setup = () => {
            this.router.post('/session/authentication', this.validator.authentication, this.validator.validate, this.controller.authentication);
            this.router.post('/session/reset_password', this.validator.resetPassword, this.validator.validate, this.controller.resetPassword);
            this.router.post('/session/register', this.validator.register, this.validator.validate, this.controller.register);
        };
        this.controller = new session_controller_v1_1.default(repository, mailService);
        this.validator = new session_validator_v1_1.default(repository);
        this.setup();
    }
}
exports.default = SessionRouter;
//# sourceMappingURL=session.router.v1.js.map