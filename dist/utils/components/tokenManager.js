"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const env_1 = __importDefault(require("./../../config/env"));
class TokenManager {
    verify(token) {
        if (token.startsWith(env_1.default.authorizationPrefix)) {
            token = token.slice(env_1.default.authorizationPrefix.length, token.length);
        }
        const secret = env_1.default.secret;
        const data = jwt.verify(token, secret);
        return data;
    }
    sign(object) {
        const expiresIn = env_1.default.tokenExpireTime;
        const secret = env_1.default.secret;
        const token = jwt.sign(object, secret, {
            expiresIn: expiresIn,
            algorithm: 'HS512'
        });
        return { token, expiresIn };
    }
    signUser(id) {
        return this.sign({ _id: id });
    }
}
exports.default = new TokenManager();
//# sourceMappingURL=tokenManager.js.map