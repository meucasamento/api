"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MailServiceMock {
    send(email, subject, body) {
        return Promise.resolve();
    }
}
exports.default = new MailServiceMock();
//# sourceMappingURL=mail.service.mock.js.map