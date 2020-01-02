"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_exception_1 = __importDefault(require("./error.exception"));
class NotFoundException extends error_exception_1.default {
    constructor() {
        super('Not found', 404);
    }
}
exports.default = new NotFoundException();
//# sourceMappingURL=notFound.exception.js.map