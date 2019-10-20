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
    }
})

const UserModel = mongoose.model<UserInterface & mongoose.Document>('User', UserScheme)

export default UserModel