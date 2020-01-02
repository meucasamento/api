"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const tokenManager_1 = __importDefault(require("../utils/components/tokenManager"));
mocha_1.describe('TokenManager', () => {
    mocha_1.it('Should generate token hash and time expiration', () => {
        try {
            const user = { _id: 'ab123', name: 'Adriano' };
            const { token, expiresIn } = tokenManager_1.default.sign(user);
            chai_1.expect(token).not.equal(null);
            chai_1.expect(expiresIn).not.equals(null);
        }
        catch (error) {
            chai_1.assert.fail(error);
        }
    });
    mocha_1.it('Extract correctly id from token hash', () => {
        try {
            const user = { _id: 'ab123', name: 'Adriano' };
            const { token } = tokenManager_1.default.sign(user);
            const tokenData = tokenManager_1.default.verify(token);
            chai_1.expect(tokenData._id).to.be.equal('ab123');
        }
        catch (error) {
            chai_1.assert.fail(error);
        }
    });
    mocha_1.it('Extract correctly user id from token hash', () => {
        try {
            const { token } = tokenManager_1.default.signUser('ab123');
            const tokenData = tokenManager_1.default.verify(token);
            chai_1.expect(tokenData._id).to.be.equal('ab123');
        }
        catch (error) {
            chai_1.assert.fail(error);
        }
    });
    mocha_1.it('Must be not extract data from invalid token', () => {
        try {
            const user = { _id: 'ab123', name: 'Adriano' };
            const { token } = tokenManager_1.default.sign(user);
            tokenManager_1.default.verify(token + 'sdfsdf');
            chai_1.assert.fail();
        }
        catch (_a) {
            chai_1.expect(true);
        }
    });
});
//# sourceMappingURL=tokenManager.test.js.map