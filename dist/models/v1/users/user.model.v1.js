"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose');
var _mongoosepaginatev2 = require('mongoose-paginate-v2'); var _mongoosepaginatev22 = _interopRequireDefault(_mongoosepaginatev2);



const UserScheme = new (0, _mongoose.Schema)({
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
})

UserScheme.plugin(_mongoosepaginatev22.default)

const UserModel = _mongoose.model('User', UserScheme) 

exports. default = UserModel
