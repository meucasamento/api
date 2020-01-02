"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const GuestScheme = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    email: String,
    invitationDelivered: {
        type: Boolean,
        default: false
    },
    isGodfather: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
GuestScheme.plugin(mongoose_paginate_v2_1.default);
const GuestModel = mongoose_1.model('Guest', GuestScheme);
exports.default = GuestModel;
//# sourceMappingURL=guest.model.v1.js.map