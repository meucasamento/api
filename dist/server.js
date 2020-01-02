"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app"));
const env_1 = __importDefault(require("./config/env"));
const mailgun_service_1 = __importDefault(require("./utils/components/mail/mailgun.service"));
const repository_factory_v1_1 = __importDefault(require("./factories/v1/repository.factory.v1"));
const server = express_1.default();
const app = new app_1.default(server, repository_factory_v1_1.default, mailgun_service_1.default);
app.setup();
server.listen(env_1.default.port, () => {
    console.log(`App listening on the port ${env_1.default.port}`);
});
//# sourceMappingURL=server.js.map