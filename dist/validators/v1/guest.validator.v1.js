"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const request_validator_1 = __importDefault(require("../request.validator"));
class GuestValidator extends request_validator_1.default {
    constructor(guestRepository) {
        super();
        this.store = [
            express_validator_1.check('name')
                .exists().withMessage('O campo nome é obrigatório')
                .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres'),
            express_validator_1.check('phone')
                .optional()
                .isString(),
            express_validator_1.check('isActive')
                .optional()
                .isBoolean(),
            express_validator_1.check('isConfirmed')
                .optional()
                .isBoolean(),
            express_validator_1.check('isGodfather')
                .optional()
                .isBoolean(),
            express_validator_1.check('email')
                .optional()
                .isEmail().bail().withMessage('Deve conter um email válido')
                .custom((email) => {
                return this.guestRepository.exists({ email }).then(exists => {
                    if (exists) {
                        throw new Error('O email já está sendo utilizado');
                    }
                    return true;
                }).catch(error => {
                    throw error;
                });
            })
        ];
        this.update = [
            express_validator_1.check('name')
                .exists().withMessage('O campo nome é obrigatório')
                .isLength({ min: 3 }).withMessage('O campo nome deve conter ao menos 3 caracteres'),
            express_validator_1.check('phone')
                .optional()
                .isString(),
            express_validator_1.check('isActive')
                .optional()
                .isBoolean(),
            express_validator_1.check('isConfirmed')
                .optional()
                .isBoolean(),
            express_validator_1.check('isGodfather')
                .optional()
                .isBoolean(),
            express_validator_1.check('email')
                .optional()
                .isEmail().bail().withMessage('Deve conter um email válido')
                .custom((email, { req }) => {
                const { id } = req.params;
                return this.guestRepository.findOne({ email }).then(guest => {
                    if (!guest || guest.id === id) {
                        return true;
                    }
                    throw new Error('O email já está sendo utilizado');
                }).catch(error => {
                    throw error;
                });
            })
        ];
        this.invitation = [
            express_validator_1.check('status')
                .exists().withMessage('O campo status é obrigatório')
                .isBoolean().withMessage('O campo status deve conter um valor do tipo boolean')
        ];
        this.active = this.invitation;
        this.guestRepository = guestRepository;
    }
}
exports.default = GuestValidator;
//# sourceMappingURL=guest.validator.v1.js.map