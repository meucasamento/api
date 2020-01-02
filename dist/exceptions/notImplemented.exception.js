"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_exception_1 = __importDefault(require("./error.exception"));
class NotImplemetedException extends error_exception_1.default {
    constructor() {
        super('Method not implemented.', 501);
    }
}
exports.default = new NotImplemetedException();
//# sourceMappingURL=notImplemented.exception.js.map