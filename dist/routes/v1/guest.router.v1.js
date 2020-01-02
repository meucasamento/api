"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_interface_1 = __importDefault(require("../router.interface"));
const guest_controller_v1_1 = __importDefault(require("../../controllers/v1/guest.controller.v1"));
const auth_middleware_v1_1 = __importDefault(require("../../middlewares/v1/auth.middleware.v1"));
const guest_validator_v1_1 = __importDefault(require("../../validators/v1/guest.validator.v1"));
class GuestRouter extends router_interface_1.default {
    constructor(repository) {
        super();
        this.setup = () => {
            this.router.use('/guests', auth_middleware_v1_1.default.checkToken);
            this.router.get('/guests', this.controller.index);
            this.router.get('/guests/:id', this.controller.findOne);
            this.router.post('/guests', this.validator.store, this.validator.validate, this.controller.store);
            this.router.patch('/guests/:id', this.validator.update, this.validator.validate, this.controller.update);
            this.router.patch('/guests/:id/invitation', this.validator.invitation, this.validator.validate, this.controller.invitation);
            this.router.patch('/guests/:id/active', this.validator.active, this.validator.validate, this.controller.active);
            this.router.delete('/guests/:id', this.controller.delete);
        };
        this.controller = new guest_controller_v1_1.default(repository);
        this.validator = new guest_validator_v1_1.default(repository);
        this.setup();
    }
}
exports.default = GuestRouter;
//# sourceMappingURL=guest.router.v1.js.map