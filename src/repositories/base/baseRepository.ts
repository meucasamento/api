import WriteRepositoryInterface from './writeRepository.interface'
import ReadRepositoryInteface from './readRepository.interface'

import NotImplementedException from './../../exceptions/notImplemented.exception'
import NotFoundException from './../../exceptions/notFound.exception'

export default class BaseRepository<T> implements ReadRepositoryInteface<T>, WriteRepositoryInterface<T> {
  async find (data?: string | number | object): Promise<[T]> {
    throw NotImplementedException
  }

  async findOne (data: string | number | object): Promise<T> {
    throw NotImplementedException
  }

  async store (data: T): Promise<T> {
    throw NotImplementedException
  }

  async update (data: T): Promise<T> {
    throw NotImplementedException
  }

  async delete (id: string): Promise<boolean> {
    throw NotImplementedException
  }
}
