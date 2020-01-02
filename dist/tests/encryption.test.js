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
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const encryption_1 = __importDefault(require("../utils/encryption"));
mocha_1.describe('Encryption', () => {
    mocha_1.it('Hash should not equals to value', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const value = '1234567';
            const hash = yield encryption_1.default.hash(value);
            chai_1.expect(hash).not.equals('1234567');
        }
        catch (error) {
            chai_1.assert.fail(error);
        }
    }));
    mocha_1.it('Hash comparison with origin value should return true', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const value = 'ab*553';
            const hash = yield encryption_1.default.hash(value);
            const compare = yield encryption_1.default.compare(value, hash);
            chai_1.assert.isTrue(compare);
        }
        catch (error) {
            chai_1.assert.fail(error);
        }
    }));
    mocha_1.it('Hash comparison with false origin value should return false', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const value = 'ab*553';
            const hash = yield encryption_1.default.hash(value);
            const compare = yield encryption_1.default.compare('ab**ˆ%%', hash);
            chai_1.assert.isFalse(compare);
        }
        catch (error) {
            chai_1.assert.fail(error);
        }
    }));
});
//# sourceMappingURL=encryption.test.js.map