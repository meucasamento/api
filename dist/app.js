"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const database_1 = __importDefault(require("./database/database"));
const router_v1_1 = __importDefault(require("./routes/v1/router.v1"));
const error_middleware_v1_1 = __importDefault(require("./middlewares/v1/error.middleware.v1"));
class App {
    constructor(server, repositoryFactory, emailService) {
        this.server = server;
        this.routerV1 = new router_v1_1.default(repositoryFactory, emailService);
    }
    setup() {
        database_1.default.setup();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(helmet_1.default());
        this.server.use(express_1.json());
        this.server.use(cors_1.default());
        this.server.use(body_parser_1.default.json());
        this.server.use(error_middleware_v1_1.default.checkError);
    }
    routes() {
        this.server.use('/api/v1', this.routerV1.router);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map