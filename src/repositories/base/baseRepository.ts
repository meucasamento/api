import { Document, Model } from 'mongoose'
import WriteRepositoryInterface from './writeRepository.interface'
import ReadRepositoryInteface from './readRepository.interface'

import NotImplementedException from './../../exceptions/notImplemented.exception'

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
    return new Promise((resolve, reject) => {
      this.model.findOne({ _id: id }).then(result => {
        resolve(result)
      }).catch((error: Error) => {
        reject(error)
      })
    })
  }

  store = async (data: T): Promise<T> => {
    return new Promise((resolve, reject) => {
      this.model.create(data).then(result => {
        resolve(result)
      }).catch((error: Error) => {
        reject(error)
      })
    })
  }

  async update (data: T): Promise<T> {
    throw NotImplementedException
  }

  async delete (id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.deleteOne({ _id: id }).then((result) => {
        reject(result)
      }).catch((error: Error) => {
        reject(error)
      })
    })
  }
}
