import UserInterface from '../../models/v1/users/user.interface.v1'
import PaginateResult from '../../repositories/base/paginateResult.interface'
import UserRepositoryInterface from './../../repositories/users/userRepository.interface'

class UserRepositoryMock implements UserRepositoryInterface {
  changePassword (id: string, newPassword: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  find (query?: object, page?: number, limit?: number, populate?: string | object): Promise<PaginateResult<UserInterface>> {
    throw new Error('Method not implemented.')
  }

  findOne (query: object, select?: string | object, projection?: string | object): Promise<UserInterface> {
    throw new Error('Method not implemented.')
  }

  exists (query: object): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  store (object: UserInterface): Promise<UserInterface> {
    throw new Error('Method not implemented.')
  }

  update (id: string, data: object): Promise<UserInterface> {
    throw new Error('Method not implemented.')
  }

  delete (id: string): Promise<UserInterface> {
    throw new Error('Method not implemented.')
  }
}

export default new UserRepositoryMock()
