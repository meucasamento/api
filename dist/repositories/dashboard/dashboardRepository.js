"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _guestmodelv1 = require('./../../models/v1/guests/guest.model.v1'); var _guestmodelv12 = _interopRequireDefault(_guestmodelv1);

class DashboardRepository  {
  async report () {
    try {
      const result = await _guestmodelv12.default.find()

      const totalGuests = result.length
      const totalGodfathers = result.filter(guest => { return guest.isGodfather }).length
      const totalDelivered = result.filter(guest => { return guest.invitationDelivered }).length
      const totalUndelivered = result.filter(guest => { return !guest.invitationDelivered }).length
      const report = {
        guests: totalGuests,
        godfathers: totalGodfathers,
        invitationsDelivered: totalDelivered,
        undeliverableInvitations: totalUndelivered
      }

      console.log(result)

      return Promise.resolve(report)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

exports. default = new DashboardRepository()
