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
const user_model_v1_1 = __importDefault(require("./../../models/v1/users/user.model.v1"));
const baseRepository_1 = __importDefault(require("./../base/baseRepository"));
const encryption_1 = __importDefault(require("./../../utils/encryption"));
class UserRepository extends baseRepository_1.default {
    constructor() {
        super(user_model_v1_1.default);
        this.store = (object) => __awaiter(this, void 0, void 0, function* () {
            try {
                object.password = yield encryption_1.default.hash(object.password);
                const user = yield this.model.create(object);
                user.password = undefined;
                return Promise.resolve(user);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
        this.changePassword = (id, newPassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                const encryptedPassword = yield encryption_1.default.hash(newPassword);
                yield this.update(id, { password: encryptedPassword });
                return Promise.resolve();
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
exports.default = new UserRepository();
//# sourceMappingURL=userRepository.js.map