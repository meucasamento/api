import UserInterface from '../../models/v1/users/user.interface.v1'
import PaginateResult from '../../repositories/base/paginateResult.interface'
import UserRepositoryInterface from '../../repositories/users/userRepository.interface'

class UserRepositoryMock implements UserRepositoryInterface {
  private fakeUsers (): UserInterface[] {
    const people = [
      { name: 'Adriano Souza Costa', email: 'adriano@gmail.com' },
      { name: 'Jenifer Queiroz Vassallo', email: 'jenifer@gmail.com' },
      { name: 'Maria Aparecida de Souza', email: 'maria@gmail.com' },
      { name: 'Francisco', email: 'francisco@gmail.com' }
    ]
    return people.map((person, index) => {
      return {
        id: `${index}`,
        createdIn: 1,
        updatedIn: 1,
        name: person.name,
        email: person.email,
        password: '$2b$10$egEx6Il6JrTTG.bzzIDUwOeWycXO.zLu7/NyBHogGkn.KdE5w.aFy' // 12345678
      } as UserInterface
    })
  }

  async changePassword (id: string, newPassword: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async find (query?: object, page?: number, limit?: number, populate?: string | object): Promise<PaginateResult<UserInterface>> {
    throw new Error('Method not implemented.')
  }

  async findOne (query: object, select?: string | object, projection?: string | object): Promise<UserInterface> {
    const queryData = query as UserInterface
    const user = this.fakeUsers()
      .find(person => person.email === queryData.email)
    return Promise.resolve(user)
  }

  async exists (query: object): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async store (object: UserInterface): Promise<UserInterface> {
    throw new Error('Method not implemented.')
  }

  async update (id: string, data: object): Promise<UserInterface> {
    throw new Error('Method not implemented.')
  }

  async delete (id: string): Promise<UserInterface> {
    throw new Error('Method not implemented.')
  }
}

export default new UserRepositoryMock()
