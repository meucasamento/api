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
const repository_factory_v1_1 = __importDefault(require("../factories/v1/repository.factory.v1"));
const mail_service_mock_1 = __importDefault(require("./mocks/mail.service.mock"));
const user_model_v1_1 = __importDefault(require("./../models/v1/users/user.model.v1"));
const encryption_1 = __importDefault(require("./../utils/encryption"));
const server = express_1.default();
const app = new app_1.default(server, repository_factory_v1_1.default, mail_service_mock_1.default);
app.setup();
function clearDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield user_model_v1_1.default.deleteMany({});
    });
}
function createSampleGuests() {
    const people = [
        'Adriano',
        'Jenifer'
    ];
    people.forEach((name) => __awaiter(this, void 0, void 0, function* () {
        const user = new user_model_v1_1.default({
            name,
            email: `${name.toLowerCase()}@gmail.com`,
            password: yield encryption_1.default.hash('12345678')
        });
        user.save();
    }));
}
mocha_1.before(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearDatabase();
    yield createSampleGuests();
}));
mocha_1.after(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearDatabase();
}));
mocha_1.describe('Authentication', () => {
    mocha_1.it('Should return token after authentication successful', () => {
        supertest_1.default(server)
            .post('/api/v1/session/authentication')
            .send({
            email: 'adriano@gmail.com',
            password: '12345678'
        })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { token, expiresIn, password } = res.body;
            chai_1.expect(null || undefined).to.be.not.equal(token);
            chai_1.expect(3600).to.be.equal(expiresIn);
            chai_1.expect(undefined).to.be.equal(password);
        });
    });
    mocha_1.it('Should return status code 401 from authentication failed', (done) => {
        supertest_1.default(server)
            .post('/api/v1/session/authentication')
            .send({
            email: 'guest@gmail.com',
            password: '123'
        })
            .expect(401, done);
    });
    mocha_1.it('Validation consistency', () => {
        supertest_1.default(server)
            .post('/api/v1/session/authentication')
            .send()
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
            chai_1.expect(errors[1].msg).to.be.equal('O campo password é obrigatório');
            chai_1.expect(errors[1].param).to.be.equal('password');
            chai_1.expect(errors[1].location).to.be.equal('body');
        });
    });
});
mocha_1.describe('Reset password', () => {
    mocha_1.it('Must be return status code 200', (done) => {
        supertest_1.default(server)
            .post('/api/v1/session/reset_password')
            .send({
            email: 'adriano@gmail.com'
        })
            .expect(200, done);
    });
    mocha_1.it('Email must be not empty', () => {
        supertest_1.default(server)
            .post('/api/v1/session/reset_password')
            .expect(422)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { errors } = res.body;
            chai_1.expect(errors[0].msg).to.be.equal('Deve conter um email válido');
            chai_1.expect(errors[0].param).to.be.equal('email');
        });
    });
    mocha_1.it('Required valid email', () => {
        supertest_1.default(server)
            .post('/api/v1/session/reset_password')
            .send({
            email: 'guest.com.br'
        })
            .expect(422)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { errors } = res.body;
            chai_1.expect(errors[0].msg).to.be.equal('Deve conter um email válido');
            chai_1.expect(errors[0].param).to.be.equal('email');
        });
    });
    mocha_1.it('Validation when not exists user with email', () => {
        supertest_1.default(server)
            .post('/api/v1/session/reset_password')
            .send({
            email: 'adriano_fake@gmail.com.br'
        })
            .expect(422)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { errors } = res.body;
            chai_1.expect(errors[0].msg).to.be.equal('Não existe nenhum usuário com esse email');
            chai_1.expect(errors[0].param).to.be.equal('email');
        });
    });
});
mocha_1.describe('Session register', () => {
    mocha_1.it('Return user infos after user store successful', () => {
        supertest_1.default(server)
            .post('/api/v1/session/register')
            .send({
            name: 'User Test',
            email: 'new_user_test@gmail.com',
            password: '12345678'
        })
            .expect(200)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { name, email, password } = res.body;
            chai_1.expect(name).to.be.equal('User Test');
            chai_1.expect(email).to.be.equal('new_user_test@gmail.com');
            chai_1.expect(password).to.be.equal(undefined);
        });
    });
    mocha_1.it('Validation consistency', () => {
        supertest_1.default(server)
            .post('/api/v1/session/register')
            .expect(422)
            .end((err, res) => {
            if (err) {
                throw err;
            }
            const { errors } = res.body;
            chai_1.expect(errors[0].msg).to.be.equal('O campo nome é obrigatório');
            chai_1.expect(errors[0].param).to.be.equal('name');
            chai_1.expect(errors[0].location).to.be.equal('body');
            chai_1.expect(errors[1].msg).to.be.equal('Deve conter um email válido');
            chai_1.expect(errors[1].param).to.be.equal('email');
            chai_1.expect(errors[1].location).to.be.equal('body');
            chai_1.expect(errors[2].msg).to.be.equal('O campo password é obrigatório');
            chai_1.expect(errors[2].param).to.be.equal('password');
            chai_1.expect(errors[2].location).to.be.equal('body');
        });
    });
    mocha_1.it('Required valid email', () => {
        supertest_1.default(server)
            .post('/api/v1/session/register')
            .send({
            name: 'User Test',
            email: 'new_user_test@.com',
            password: '12345678'
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
    mocha_1.it('Should not pass up a existing email', () => {
        supertest_1.default(server)
            .post('/api/v1/session/register')
            .send({
            name: 'User Test',
            email: 'adriano@gmail.com',
            password: '12345678'
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
//# sourceMappingURL=session.router.test.js.map