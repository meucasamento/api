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
const tokenManager_1 = __importDefault(require("../../utils/components/tokenManager"));
class UserController {
    constructor(repository) {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            try {
                const users = yield this.repository.find(data, page, limit);
                return res.send(users);
            }
            catch (error) {
                next(error);
            }
        });
        this.findOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield this.repository.findOne({ _id: id });
                return res.send(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const { name, email } = req.body;
            try {
                const { _id } = yield tokenManager_1.default.verify(token);
                const userUpdated = yield this.repository.update(_id, { name, email });
                const newToken = tokenManager_1.default.signUser(_id);
                return res.send({
                    user: userUpdated,
                    token: newToken
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.changePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const { newPassword } = req.body;
            try {
                const { _id } = tokenManager_1.default.verify(token);
                yield this.repository.changePassword(_id, newPassword);
                const updatedToken = yield tokenManager_1.default.signUser(_id);
                return res.send(updatedToken);
            }
            catch (error) {
                next(error);
            }
        });
        this.repository = repository;
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.v1.js.map