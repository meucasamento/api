import UserInterface from '../../models/v1/users/user.interface.v1'
import ReadRepositoryInterface from './../base/readRepository.interface'
import WriteRepositoryInterface from './../base/writeRepository.interface'

export default interface UserRepositoryInterface extends ReadRepositoryInterface<UserInterface>, WriteRepositoryInterface<UserInterface> {
    changePassword(id: string, newPassword: string): Promise<void>
}
