"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./../config/env"));
class Database {
    setup() {
        const uri = env_1.default.mongodbURI;
        mongoose_1.default.set('useCreateIndex', true);
        mongoose_1.default.set('useFindAndModify', false);
        mongoose_1.default.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.log('Erro: ', err);
        });
        mongoose_1.default.connection.on('connected', () => {
            if (process.env.NODE_ENV === 'test') {
                return;
            }
            console.log(`Conectado a ${uri}`);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log(`Desconetado de ${uri}`);
        });
        process.on('SIGINT', () => {
            mongoose_1.default.connection.close(() => {
                process.exit(0);
            });
        });
    }
}
exports.default = new Database();
//# sourceMappingURL=database.js.map