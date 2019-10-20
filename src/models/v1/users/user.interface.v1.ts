import { Document } from 'mongoose'

export default interface UserInterface extends Document {
    id: string
    createdIn: number
    updatedIn: number
    name: string
    email: string
    password: string
}
