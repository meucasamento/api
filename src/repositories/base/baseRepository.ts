import { Document, Model } from 'mongoose'
import WriteRepositoryInterface from './writeRepository.interface'
import ReadRepositoryInteface from './readRepository.interface'

import NotImplementedException from './../../exceptions/notImplemented.exception'
import ErrorException from './../../exceptions/error.exception'

export default class BaseRepository<T extends Document> implements ReadRepositoryInteface<T>, WriteRepositoryInterface<T> {
  private model: Model<T>

  constructor (model: Model<T>) {
    this.model = model
  }

  async find (data?: string | number | object): Promise<[T]> {
    return new Promise((resolve, reject) => {
      this.model.find().then((result: [T]) => {
        resolve(result)
      }).catch((error: Error) => {
        reject(new ErrorException(error.message))
      })
    })
  }

  async findOne (id: string | number): Promise<T> {
    throw NotImplementedException
  }

  store = async (data: T): Promise<T> => {
    return new Promise((resolve, reject) => {
      this.model.create(data).then(result => {
        resolve(result)
      }).catch((error: Error) => {
        reject(new ErrorException(error.message))
      })
    })
  }

  async update (data: T): Promise<T> {
    throw NotImplementedException
  }

  async delete (id: string): Promise<boolean> {
    throw NotImplementedException
  }
}
