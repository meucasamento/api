"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorMiddleware {
    checkError(error, re, res, next) {
        const message = error.message;
        const status = error.status || 500;
        res.status(status).send({ message });
    }
}
exports.default = new ErrorMiddleware();
//# sourceMappingURL=error.middleware.v1.js.map