import { Document } from 'mongoose'

export default interface UserInterface extends Document {
    _id: string
    createdIn: number
    updatedIn: number
    name: string
    email: string
    password: string
}
