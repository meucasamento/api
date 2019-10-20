import { Document, Model } from 'mongoose'
import WriteRepositoryInterface from './writeRepository.interface'
import ReadRepositoryInteface from './readRepository.interface'

import NotImplementedException from './../../exceptions/notImplemented.exception'
import NoValidDataException from './../../exceptions/noValidData.exception'

export default class BaseRepository<T extends Document> implements ReadRepositoryInteface<T>, WriteRepositoryInterface<T> {
  private model: Model<T>

  constructor (model: Model<T>) {
    this.model = model
  }

  async find (data?: string | number | object): Promise<[T]> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await <[T]><unknown> this.model.find()
        resolve(result)
      } catch (error) {
        reject(new NoValidDataException(error.message))
      }
    })
  }

  async findOne (id: string | number): Promise<T> {
    throw NotImplementedException
  }

  store = async (data: T): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      try {
        const newData = await this.model.create(data)
        resolve(newData)
      } catch (error) {
        reject(new NoValidDataException(error.message))
      }
    })
  }

  async update (data: T): Promise<T> {
    throw NotImplementedException
  }

  async delete (id: string): Promise<boolean> {
    throw NotImplementedException
  }
}
