import { Document } from 'mongoose'

export default interface GuestInterface extends Document {
    _id: string
    name: string
    phone?: string
    email?: string
    createdIn: number
    updatedIn: number
    isActive?: boolean
    invitationDelivered?: boolean
    isGodfather?: boolean
    includeFamily?: boolean
    peopleCount?: number
    guestOf?: string
}
