"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const UserScheme = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        isEmail: true,
        unique: true,
        createIndexes: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {
    timestamps: true
});
UserScheme.plugin(mongoose_paginate_v2_1.default);
const UserModel = mongoose_1.model('User', UserScheme);
exports.default = UserModel;
//# sourceMappingURL=user.model.v1.js.map