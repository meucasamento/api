import { Document } from 'mongoose'

export default interface GuestInterface extends Document {
    id: string
    name: string
    phone?: string
    createdIn: number
    updatedIn: number
    isActive?: boolean
    isConfirmed?: boolean
    isGodfather?: boolean
}
