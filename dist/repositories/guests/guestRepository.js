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
const baseRepository_1 = __importDefault(require("./../base/baseRepository"));
const guest_model_v1_1 = __importDefault(require("./../../models/v1/guests/guest.model.v1"));
class GuestRepository extends baseRepository_1.default {
    constructor() {
        super(guest_model_v1_1.default);
    }
    invitation(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const guest = yield this.update(id, { invitationDelivered: status });
                return Promise.resolve(guest);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
}
exports.default = new GuestRepository();
//# sourceMappingURL=guestRepository.js.map