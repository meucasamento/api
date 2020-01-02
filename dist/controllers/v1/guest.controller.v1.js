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
Object.defineProperty(exports, "__esModule", { value: true });
class GuestController {
    constructor(repository) {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            try {
                const guests = yield this.repository.find(data, page, limit);
                return res.send(guests);
            }
            catch (error) {
                next(error);
            }
        });
        this.findOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const guest = yield this.repository.findOne({ _id: id });
                if (!guest) {
                    return res.status(404).send();
                }
                return res.send(guest);
            }
            catch (error) {
                next(error);
            }
        });
        this.store = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, phone, email, isActive, invitationDelivered, isGodfather } = req.body;
            const guest = {
                name,
                phone,
                email,
                isActive,
                invitationDelivered,
                isGodfather
            };
            try {
                const newGuest = yield this.repository.store(guest);
                return res.send(newGuest);
            }
            catch (err) {
                next(err);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, phone, email, isActive, invitationDelivered, isGodfather } = req.body;
            try {
                const guestUpdated = yield this.repository.update(id, {
                    name,
                    phone,
                    email,
                    isActive,
                    invitationDelivered,
                    isGodfather
                });
                return res.send(guestUpdated);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.repository.delete(id);
                return res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
        this.invitation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            try {
                const guest = yield this.repository.invitation(id, status);
                if (!guest) {
                    return res.status(404).send();
                }
                return res.send(guest);
            }
            catch (error) {
                next(error);
            }
        });
        this.active = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            try {
                const guest = yield this.repository.update(id, { isActive: status });
                if (!guest) {
                    return res.status(404).send();
                }
                return res.send(guest);
            }
            catch (error) {
                next(error);
            }
        });
        this.repository = repository;
    }
}
exports.default = GuestController;
//# sourceMappingURL=guest.controller.v1.js.map