"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }




 class BaseRepository {
  

  constructor (model) {;BaseRepository.prototype.__init.call(this);BaseRepository.prototype.__init2.call(this);BaseRepository.prototype.__init3.call(this);BaseRepository.prototype.__init4.call(this);BaseRepository.prototype.__init5.call(this);BaseRepository.prototype.__init6.call(this);
    this.model = model
  }

  __init() {this.find = async (query, page, limit, populate) => {
    const options = {
      page: page || 1,
      limit: limit || 10,
      populate: populate
    }

    try {
      const { docs, totalDocs, limit, totalPages, page } = await this.model.paginate(query, options)
      const result = {
        items: docs,
        pagination: {
          total: totalDocs,
          limit: limit,
          page: page,
          pages: totalPages
        }
      } 
      return Promise.resolve(result)
    } catch (err) {
      return Promise.reject(err)
    }
  }}

  __init2() {this.findOne = async (query, select, projection) => {
    try {
      const result = await this.model
        .findOne(query, projection)
        .select(select)
      return Promise.resolve(result)
    } catch (err) {
      console.log(err)
      return Promise.reject(err)
    }
  }}

  __init3() {this.exists = async (query) => {
    try {
      const result = await this.findOne(query)
      return Promise.resolve(result != null)
    } catch (err) {
      return Promise.resolve(false)
    }
  }}

  __init4() {this.store = async (object) => {
    return this.model.create(object)
  }}

  __init5() {this.update = async (id, data) => {
    return this.model.findByIdAndUpdate({ _id: id }, data, { new: true, omitUndefined: true })
  }}

  __init6() {this.delete = async (id) => {
    return this.model.findByIdAndDelete(id)
  }}
} exports.default = BaseRepository;
