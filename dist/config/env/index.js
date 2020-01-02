"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
class Config {
    constructor() {
        this.setupEnvironments();
        this.setupProperties();
    }
    setupEnvironments() {
        dotenv.config();
        const sulfix = process.env.NODE_ENV;
        dotenv.config({ path: `${__dirname}/../../../.env.${sulfix}` });
    }
    setupProperties() {
        this.authorizationPrefix = 'Bearer ';
        this.secret = process.env.SECRET;
        this.tokenExpireTime = 3600;
        this.port = Number(process.env.PORT || 3333);
        this.mongodbURI = process.env.MONGODB_URI;
        this.mailgunApiKey = process.env.MAILGUN_API_KEY;
        this.mailgunDomain = process.env.MAILGUN_DOMAIN;
    }
}
exports.default = new Config();
//# sourceMappingURL=index.js.map