import mongoose from 'mongoose'
import GuestInterface from './guest.interface.v1'

const GuestScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  isConfirmed: {
    type: Boolean,
    default: false
  },
  isGodfather: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const GuestModel = mongoose.model<GuestInterface>('GuestModel', GuestScheme)

export default GuestModel
