import { Document, Model } from 'mongoose'
import WriteRepositoryInterface from './writeRepository.interface'
import ReadRepositoryInteface from './readRepository.interface'

export default class BaseRepository<T extends Document> implements ReadRepositoryInteface<T>, WriteRepositoryInterface<T> {
  private model: Model<T>

  constructor (model: Model<T>) {
    this.model = model
  }

  find = async (query?: object): Promise<[T]> => {
    try {
      const itens = await this.model.find(query) as [T]
      return Promise.resolve(itens)
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

  update = async (id: string, data: unknown): Promise<T> => {
    return this.model.findByIdAndUpdate({ _id: id }, data, { new: true })
  }

  delete = async (id: string): Promise<T> => {
    return this.model.findByIdAndDelete(id)
  }
}
