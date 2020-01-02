"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const env_1 = __importDefault(require("./../../../config/env"));
class MailgunService {
    send(email, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailgun = new mailgun_js_1.default({
                apiKey: env_1.default.mailgunApiKey,
                domain: env_1.default.mailgunDomain
            });
            try {
                yield mailgun.messages().send({
                    from: 'adrianosouzacostaios@gmail.com',
                    to: email,
                    subject: subject,
                    html: body
                });
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.default = new MailgunService();
//# sourceMappingURL=mailgun.service.js.map