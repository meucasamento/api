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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app"));
const repository_factory_v1_1 = __importDefault(require("./../factories/v1/repository.factory.v1"));
const mail_service_mock_1 = __importDefault(require("./mocks/mail.service.mock"));
const tokenManager_1 = __importDefault(require("../utils/components/tokenManager"));
const guest_model_v1_1 = __importDefault(require("./../models/v1/guests/guest.model.v1"));
const server = express_1.default();
const app = new app_1.default(server, repository_factory_v1_1.default, mail_service_mock_1.default);
app.setup();
const { token } = tokenManager_1.default.signUser('abb123');
function clearDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield guest_model_v1_1.default.deleteMany({});
    });
}
function createSampleGuests() {
    return __awaiter(this, void 0, void 0, function* () {
        const people = [
            'Jonatas',
            'Deise',
            'Ebert',
            'Sarah',
            'Jenifer'
        ];
        people.forEach((name) => __awaiter(this, void 0, void 0, function* () {
            const guest = yield new guest_model_v1_1.default({
                name,
                email: `${name.toLowerCase()}@gmail.com`
            });
            guest.save();
        }));
    });
}
mocha_1.before(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearDatabase();
    yield createSampleGuests();
}));
mocha_1.after(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearDatabase();
}));
mocha_1.describe('Guests', () => {
    mocha_1.it('Authentication is required', (done) => {
        supertest_1.default(server)
            .get('/api/v1/guests')
            .expect(401, done);
    });
    mocha_1.it('Retrieve guests', () => {
        supertest_1.default(server)
            .get('/api/v1/guests')
            .set('authorization', token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { items, pagination } = res.body;
            const names = items.map((item) => {
                return item.name;
            }).sort();
            chai_1.expect(5).equal(pagination.total);
            chai_1.expect(10).equal(pagination.limit);
            chai_1.expect(1).equal(pagination.page);
            chai_1.expect(1).equal(pagination.pages);
            chai_1.expect('Deise').equal(names[0]);
            chai_1.expect('Ebert').equal(names[1]);
            chai_1.expect('Jenifer').equal(names[2]);
            chai_1.expect('Jonatas').equal(names[3]);
            chai_1.expect('Sarah').equal(names[4]);
        });
    });
    mocha_1.it('Retrieve existent guest', () => __awaiter(void 0, void 0, void 0, function* () {
        const guests = yield guest_model_v1_1.default.find();
        const id = guests[0].id;
        supertest_1.default(server)
            .get(`/api/v1/guests/${id}`)
            .set('authorization', token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { id, name, invitationDelivered, isGodfather, isActive } = res.body;
            chai_1.expect(id).equal(id);
            chai_1.expect('Jonatas').equal(name);
            chai_1.expect(false).equal(invitationDelivered);
            chai_1.expect(false).equal(isGodfather);
            chai_1.expect(true).equal(isActive);
        });
    }));
    mocha_1.it('Status code must be equal to 404 when guest does not exist', (done) => {
        const id = mongoose_1.default.Types.ObjectId();
        supertest_1.default(server)
            .get('/api/v1/guests/' + id)
            .set('authorization', token)
            .expect(404, done);
    });
});
mocha_1.describe('Guest invitation', () => {
    mocha_1.it('Authentication is required', (done) => {
        supertest_1.default(server)
            .patch('/api/v1/guests/5dc9319f5187692e3d64a2ebb/invitation')
            .expect(401, done);
    });
    mocha_1.it('Send invitation should require status', () => __awaiter(void 0, void 0, void 0, function* () {
        const guests = yield guest_model_v1_1.default.find();
        const id = guests[0].id;
        supertest_1.default(server)
            .patch(`/api/v1/guests/${id}/invitation`)
            .set('authorization', token)
            .expect(422)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { errors } = res.body;
            chai_1.expect(errors[0].msg).to.be.equal('O campo status é obrigatório');
            chai_1.expect(errors[0].param).to.be.equal('status');
            chai_1.expect(errors[0].location).to.be.equal('body');
            chai_1.expect(errors[1].msg).to.be.equal('O campo status deve conter um valor do tipo boolean');
            chai_1.expect(errors[1].param).to.be.equal('status');
            chai_1.expect(errors[1].location).to.be.equal('body');
        });
    }));
    mocha_1.it('Status code must be 404 when guest does note exist', (done) => {
        const id = mongoose_1.default.Types.ObjectId();
        supertest_1.default(server)
            .patch(`/api/v1/guests/${id}/invitation`)
            .set('authorization', token)
            .send({
            status: true
        })
            .expect(404, done);
    });
    mocha_1.it('Mark invitation as delivered', () => __awaiter(void 0, void 0, void 0, function* () {
        const guests = yield guest_model_v1_1.default.find();
        const identifier = guests[0].id;
        supertest_1.default(server)
            .patch(`/api/v1/guests/${identifier}/invitation`)
            .set('authorization', token)
            .send({
            status: true
        })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { _id, name, invitationDelivered } = res.body;
            chai_1.expect(identifier).to.be.equal(_id);
            chai_1.expect('Jonatas').to.be.equal(name);
            chai_1.expect(true).to.be.equal(invitationDelivered);
        });
    }));
    mocha_1.it('Mark invitation as undelivered', () => __awaiter(void 0, void 0, void 0, function* () {
        const guests = yield guest_model_v1_1.default.find();
        const identifier = guests[1].id;
        supertest_1.default(server)
            .patch(`/api/v1/guests/${identifier}/invitation`)
            .set('authorization', token)
            .send({
            status: false
        })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { _id, name, invitationDelivered } = res.body;
            chai_1.expect(identifier).to.be.equal(_id);
            chai_1.expect('Deise').to.be.equal(name);
            chai_1.expect(false).to.be.equal(invitationDelivered);
        });
    }));
});
mocha_1.describe('Guest register', () => {
    mocha_1.it('Authentication is required', (done) => {
        supertest_1.default(server)
            .post('/api/v1/guests')
            .expect(401, done);
    });
    mocha_1.it('Return guest infos after store successful', () => {
        supertest_1.default(server)
            .post('/api/v1/guests')
            .set('authorization', token)
            .send({
            name: 'Ana Paula',
            email: 'ana.paula@gmail.com'
        })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { name, email } = res.body;
            chai_1.expect(name).to.be.equal('Ana Paula');
            chai_1.expect(email).to.be.equal('ana.paula@gmail.com');
        });
    });
    mocha_1.it('Name must be required', () => {
        supertest_1.default(server)
            .post('/api/v1/guests')
            .set('authorization', token)
            .expect(422)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { errors } = res.body;
            chai_1.expect(errors[0].msg).to.be.equal('O campo nome é obrigatório');
            chai_1.expect(errors[0].param).to.be.equal('name');
            chai_1.expect(errors[0].location).to.be.equal('body');
        });
    });
    mocha_1.it('Name must be longer than 3 characters', () => {
        supertest_1.default(server)
            .post('/api/v1/guests')
            .set('authorization', token)
            .send({
            name: 'ad'
        })
            .expect(422)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { errors } = res.body;
            chai_1.expect(errors[0].msg).to.be.equal('O campo nome deve conter ao menos 3 caracteres');
            chai_1.expect(errors[0].param).to.be.equal('name');
            chai_1.expect(errors[0].location).to.be.equal('body');
        });
    });
    mocha_1.it('Email must be valid', () => {
        supertest_1.default(server)
            .post('/api/v1/guests')
            .set('authorization', token)
            .send({
            name: 'Adriano',
            email: 'adriano.souza.com.br'
        })
            .expect(422)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { errors } = res.body;
            chai_1.expect(errors[0].msg).to.be.equal('Deve conter um email válido');
            chai_1.expect(errors[0].param).to.be.equal('email');
            chai_1.expect(errors[0].location).to.be.equal('body');
        });
    });
    mocha_1.it('Email must be unique', () => {
        supertest_1.default(server)
            .post('/api/v1/guests')
            .set('authorization', token)
            .send({
            name: 'Jonatas Castro',
            email: 'jonatas@gmail.com'
        })
            .expect(422)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { errors } = res.body;
            chai_1.expect(errors[0].msg).to.be.equal('O email já está sendo utilizado');
            chai_1.expect(errors[0].param).to.be.equal('email');
            chai_1.expect(errors[0].location).to.be.equal('body');
        });
    });
});
//# sourceMappingURL=guest.router.test.js.map