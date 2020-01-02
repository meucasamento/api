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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("../app"));
const repository_factory_v1_1 = __importDefault(require("./../factories/v1/repository.factory.v1"));
const mail_service_mock_1 = __importDefault(require("./mocks/mail.service.mock"));
const tokenManager_1 = __importDefault(require("../utils/components/tokenManager"));
const guest_model_v1_1 = __importDefault(require("./../models/v1/guests/guest.model.v1"));
const server = express_1.default();
const app = new app_1.default(server, repository_factory_v1_1.default, mail_service_mock_1.default);
app.setup();
function clearDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield guest_model_v1_1.default.deleteMany({});
    });
}
function createSampleGuests() {
    return __awaiter(this, void 0, void 0, function* () {
        yield new guest_model_v1_1.default({
            name: 'one',
            email: 'one@gmail.com'
        }).save();
        yield new guest_model_v1_1.default({
            name: 'two',
            email: 'two@gmail.com',
            invitationDelivered: true,
            isGodfather: true
        }).save();
        yield new guest_model_v1_1.default({
            name: 'three',
            email: 'three@gmail.com',
            invitationDelivered: true
        }).save();
    });
}
mocha_1.before(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearDatabase();
    yield createSampleGuests();
}));
mocha_1.after(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearDatabase();
}));
mocha_1.describe('Dashboard', () => {
    mocha_1.it('Authentication is required', (done) => {
        supertest_1.default(server)
            .get('/api/v1/dashboard/report')
            .expect(401, done);
    });
    mocha_1.it('Must be return report', () => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = tokenManager_1.default.signUser('abb123');
        supertest_1.default(server)
            .get('/api/v1/dashboard/report')
            .set('authorization', token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { guests, godfathers, invitationsDelivered, undeliverableInvitations } = res.body;
            chai_1.expect(3).to.be.equal(guests);
            chai_1.expect(1).to.be.equal(godfathers);
            chai_1.expect(2).to.be.equal(invitationsDelivered);
            chai_1.expect(1).to.be.equal(undeliverableInvitations);
        });
    }));
});
//# sourceMappingURL=dashboard.router.test.js.map