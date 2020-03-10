import { Schema, model, PaginateModel } from 'mongoose'
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
  godfatherOf: String,
  isActive: {
    type: Boolean,
    default: true
  },
  includeFamily: {
    type: Boolean,
    default: false
  },
  peopleCount: {
    type: Number,
    default: 1
  },
  hasCompanion: {
    type: Boolean,
    default: false
  },
  companion: String
}, {
  timestamps: true
})

GuestScheme.plugin(mongoosePaginate)

const GuestModel = model<GuestInterface>('Guest', GuestScheme) as PaginateModel<GuestInterface>

export default GuestModel
