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
const bcrypt_1 = __importDefault(require("bcrypt"));
class Encryption {
    hash(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.hash(data, 10);
        });
    }
    compare(data, encrypted) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.compare(data, encrypted);
        });
    }
}
exports.default = new Encryption();
//# sourceMappingURL=encryption.js.map