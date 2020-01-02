"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboardRepository_1 = __importDefault(require("../../repositories/dashboard/dashboardRepository"));
const userRepository_1 = __importDefault(require("../../repositories/users/userRepository"));
const guestRepository_1 = __importDefault(require("../../repositories/guests/guestRepository"));
class RepositoriesFactory {
    constructor() {
        this.dashboardRepository = dashboardRepository_1.default;
        this.userRepository = userRepository_1.default;
        this.guestRepository = guestRepository_1.default;
    }
}
exports.default = new RepositoriesFactory();
//# sourceMappingURL=repository.factory.v1.js.map