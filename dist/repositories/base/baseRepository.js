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
class BaseRepository {
    constructor(model) {
        this.find = (query, page, limit, populate) => __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: page || 1,
                limit: limit || 10,
                populate: populate
            };
            try {
                const { docs, totalDocs, limit, totalPages, page } = yield this.model.paginate(query, options);
                const result = {
                    items: docs,
                    pagination: {
                        total: totalDocs,
                        limit: limit,
                        page: page,
                        pages: totalPages
                    }
                };
                return Promise.resolve(result);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
        this.findOne = (query, select, projection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model
                    .findOne(query, projection)
                    .select(select);
                return Promise.resolve(result);
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
        this.exists = (query) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.findOne(query);
                return Promise.resolve(result != null);
            }
            catch (err) {
                return Promise.resolve(false);
            }
        });
        this.store = (object) => __awaiter(this, void 0, void 0, function* () {
            return this.model.create(object);
        });
        this.update = (id, data) => __awaiter(this, void 0, void 0, function* () {
            return this.model.findByIdAndUpdate({ _id: id }, data, { new: true, omitUndefined: true });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            return this.model.findByIdAndDelete(id);
        });
        this.model = model;
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=baseRepository.js.map