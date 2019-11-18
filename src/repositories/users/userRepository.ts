import { Document } from 'mongoose'
import UserInterface from '../../models/v1/users/user.interface.v1'
import UserModel from './../../models/v1/users/user.model.v1'
import UserRepositoryInterface from './userRepository.interface'
import BaseRepository from './../base/baseRepository'
import Encryption from './../../utils/encryption'

class UserRepository extends BaseRepository<UserInterface & Document> implements UserRepositoryInterface {
  constructor () {
    super(UserModel)
  }

  store = async (object: UserInterface): Promise<UserInterface> => {
    try {
      object.password = await Encryption.hash(object.password)
      const user = await this.model.create(object)
      user.password = undefined
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  changePassword = async (id: string, newPassword: string): Promise<void> => {
    try {
      const encryptedPassword = await Encryption.hash(newPassword)
      await this.update(id, { password: encryptedPassword })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default new UserRepository()
