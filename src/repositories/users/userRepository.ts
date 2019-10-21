import UserInterface from '../../models/v1/users/user.interface.v1'
import UserModel from './../../models/v1/users/user.model.v1'
import UserRepositoryInterface from './userRepository.interface'
import BaseRepository from './../base/baseRepository'
import NotImplementedException from './../../exceptions/notImplemented.exception'

class UserRepository extends BaseRepository<UserInterface> implements UserRepositoryInterface {
  constructor () {
    super(UserModel)
  }

  async changePassword (currentPassword: string, newPassword: string): Promise<boolean> {
    throw NotImplementedException
  }
}

export default new UserRepository()
