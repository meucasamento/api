"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var _baseRepository = require('./../base/baseRepository'); var _baseRepository2 = _interopRequireDefault(_baseRepository);
var _guestmodelv1 = require('./../../models/v1/guests/guest.model.v1'); var _guestmodelv12 = _interopRequireDefault(_guestmodelv1);

class GuestRepository extends _baseRepository2.default {
  constructor () {
    super(_guestmodelv12.default)
  }

  async invitation (id, status) {
    try {
      const guest = await this.update(id, { invitationDelivered: status })
      return Promise.resolve(guest)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

exports. default = new GuestRepository()
