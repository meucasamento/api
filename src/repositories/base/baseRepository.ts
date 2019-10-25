import { Document, Model } from 'mongoose'
import WriteRepositoryInterface from './writeRepository.interface'
import ReadRepositoryInteface from './readRepository.interface'

export default class BaseRepository<T extends Document> implements ReadRepositoryInteface<T>, WriteRepositoryInterface<T> {
  private model: Model<T>

  constructor (model: Model<T>) {
    this.model = model
  }

  async find (query?: object): Promise<[T]> {
    return new Promise((resolve, reject) => {
      this.model.find(query).then((result: [T]) => {
        resolve(result)
      }).catch((error: Error) => {
        reject(error)
      })
    })
  }

  async findOne (id: string | number): Promise<T> {
    return this.model.findOne({ _id: id })
  }

  store = async (object: T): Promise<T> => {
    return this.model.create(object)
  }

  async update (id: string, object: T): Promise<T> {
    return this.model.findByIdAndUpdate({ _id: id }, object, { new: true })
  }

  async delete (id: string): Promise<T> {
    return this.model.findByIdAndDelete(id)
  }
}
