import UserInterface from '../../models/v1/users/user.interface.v1'
import UserRepositoryInterface from './userRepository.interface'
import BaseRepository from './../base/baseRepository'
import NotImplementedException from './../../exceptions/notImplemented.exception'

class UserRepository extends BaseRepository<UserInterface> implements UserRepositoryInterface {
    
    async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
        throw NotImplementedException
    }
    
}

export default new UserRepository()