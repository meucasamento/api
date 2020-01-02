"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const request_validator_1 = __importDefault(require("./../request.validator"));
const tokenManager_1 = __importDefault(require("./../../utils/components/tokenManager"));
class UserValidator extends request_validator_1.default {
    constructor(userRepository) {
        super();
        this.findOne = [
            express_validator_1.param('id')
                .exists().withMessage('O campo id é obrigatório')
                // .matches('/^[0-9a-fA-F]{12}$/').withMessage('O deve estar no formáto válido')
                .custom(id => {
                return this.userRepository.exists({ _id: id }).then((exists) => {
                    if (!exists) {
                        throw new Error('O usuário não existe');
                    }
                    return true;
                }).catch((error) => {
                    throw error;
                });
            })
        ];
        this.update = [
            express_validator_1.check('name')
                .exists().withMessage('O campo nome é obrigatório')
                .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres'),
            express_validator_1.check('email')
                .isEmail().bail().withMessage('Deve conter um email válido')
                .custom((email, { req }) => {
                const { _id } = tokenManager_1.default.verify(req.headers.authorization);
                return this.userRepository.findOne({ email }).then(user => {
                    if (!user || user.id === _id) {
                        return true;
                    }
                    else {
                        throw new Error('O email já está sendo utilizado');
                    }
                }).catch(error => {
                    throw error;
                });
            })
        ];
        this.changePassword = [
            express_validator_1.check('newPassword').exists()
        ];
        this.userRepository = userRepository;
    }
}
exports.default = UserValidator;
//# sourceMappingURL=user.validator.v1.js.map