"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const request_validator_1 = __importDefault(require("../request.validator"));
class SessionValidator extends request_validator_1.default {
    constructor(userRepository) {
        super();
        this.authentication = [
            express_validator_1.check('email').isEmail().withMessage('Deve conter um email válido'),
            express_validator_1.check('password').exists().withMessage('O campo password é obrigatório')
        ];
        this.register = [
            express_validator_1.check('name').exists().withMessage('O campo nome é obrigatório'),
            express_validator_1.check('email').isEmail().bail().withMessage('Deve conter um email válido')
                .custom((email) => {
                return this.userRepository.exists({ email }).then(exists => {
                    if (exists) {
                        throw new Error('O email já está sendo utilizado');
                    }
                    return true;
                }).catch(error => {
                    throw error;
                });
            }),
            express_validator_1.check('password').exists().withMessage('O campo password é obrigatório')
        ];
        this.resetPassword = [
            express_validator_1.check('email').isEmail().withMessage('Deve conter um email válido').bail()
                .custom((email) => {
                return this.userRepository.exists({ email }).then(exists => {
                    if (!exists) {
                        throw new Error('Não existe nenhum usuário com esse email');
                    }
                    return true;
                }).catch(error => {
                    throw error;
                });
            })
        ];
        this.userRepository = userRepository;
    }
}
exports.default = SessionValidator;
//# sourceMappingURL=session.validator.v1.js.map