"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose');

var _mongoosepaginatev2 = require('mongoose-paginate-v2'); var _mongoosepaginatev22 = _interopRequireDefault(_mongoosepaginatev2);

const GuestScheme = new (0, _mongoose.Schema)({
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
})

GuestScheme.plugin(_mongoosepaginatev22.default)

const GuestModel = _mongoose.model('Guest', GuestScheme) 

exports. default = GuestModel
