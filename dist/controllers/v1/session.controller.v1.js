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
const encryption_1 = __importDefault(require("./../../utils/encryption"));
class SessionController {
    constructor(userRepository, mailService) {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const user = yield this.userRepository.store({
                    name,
                    email,
                    password: password
                });
                return res.send(user);
            }
            catch (error) {
                next(error);
            }
        });
        this.authentication = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield this.userRepository.findOne({ email }, '+password');
                if (!user) {
                    return res.status(401).send();
                }
                const mathPassword = yield encryption_1.default.compare(password, user.password);
                if (mathPassword) {
                    const data = tokenManager_1.default.signUser(user.id);
                    return res.send(data);
                }
                else {
                    return res.status(401).send();
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.resetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const randomString = Math.random().toString(36).slice(-8);
                const encryptedPassword = yield encryption_1.default.hash(randomString);
                const { id } = yield this.userRepository.findOne({ email });
                yield this.userRepository.update(id, { password: encryptedPassword });
                yield this.mailService.send(email, 'Reset de senha', `Sua senha foi resetada com sucesso, para acesso temporário você deve usar a senha temporária: <strong>${randomString}</strong>.`);
                return res.send();
            }
            catch (error) {
                next(error);
            }
        });
        this.userRepository = userRepository;
        this.mailService = mailService;
    }
}
exports.default = SessionController;
//# sourceMappingURL=session.controller.v1.js.map