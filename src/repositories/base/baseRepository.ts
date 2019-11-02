import { Document, PaginateModel } from 'mongoose'
import WriteRepositoryInterface from './writeRepository.interface'
import ReadRepositoryInteface from './readRepository.interface'
import PaginateResultInterface from './paginateResult.interface'

export default class BaseRepository<T extends Document> implements ReadRepositoryInteface<T>, WriteRepositoryInterface<T> {
  private model: PaginateModel<T>

  constructor (model: PaginateModel<T>) {
    this.model = model
  }

  find = async (query?: object, page?: number, limit?: number): Promise<PaginateResultInterface<T>> => {
    const options = {
      page: page || 1,
      limit: limit || 10
    }

    try {
      return Promise.resolve(await this.model.paginate(query, options))
    } catch (err) {
      return Promise.reject(err)
    }
  }

  findOne = async (query: object): Promise<T> => {
    return this.model.findOne(query)
  }

  exists = async (query: object): Promise<boolean> => {
    try {
      const result = await this.findOne(query)
      return Promise.resolve(result != null)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  store = async (object: T): Promise<T> => {
    return this.model.create(object)
  }

  update = async (id: string, data: object): Promise<T> => {
    return this.model.findByIdAndUpdate({ _id: id }, data, { new: true })
  }

  delete = async (id: string): Promise<T> => {
    return this.model.findByIdAndDelete(id)
  }
}
