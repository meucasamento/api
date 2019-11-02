import { Schema, model, PaginateModel } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import UserInterface from './user.interface.v1'

const UserScheme = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    isEmail: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, {
  timestamps: true
})

UserScheme.plugin(mongoosePaginate)

const UserModel = model<UserInterface>('User', UserScheme) as PaginateModel<UserInterface>

export default UserModel
