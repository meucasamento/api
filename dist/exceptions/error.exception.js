"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorException extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}
exports.default = ErrorException;
//# sourceMappingURL=error.exception.js.map