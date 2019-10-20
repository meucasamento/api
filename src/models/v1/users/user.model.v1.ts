import mongoose from 'mongoose'
import UserInterface from './user.interface.v1'

const UserScheme = new mongoose.Schema({
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
    required: true
  },
  isGodfather: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const UserModel = mongoose.model<UserInterface>('User', UserScheme)

export default UserModel
