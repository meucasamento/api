"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class RequestValidator {
    constructor() {
        this.validate = (req, res, next) => {
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
            }
            else {
                next();
            }
        };
    }
}
exports.default = RequestValidator;
//# sourceMappingURL=request.validator.js.map