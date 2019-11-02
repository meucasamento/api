import { Schema, model } from 'mongoose'
import GuestInterface from './guest.interface.v1'
import mongoosePaginate from 'mongoose-paginate-v2'

const GuestScheme = new Schema({
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
    default: false
  }
}, {
  timestamps: true
})

GuestScheme.plugin(mongoosePaginate)

const GuestModel = model<GuestInterface>('GuestModel', GuestScheme)

export default GuestModel
