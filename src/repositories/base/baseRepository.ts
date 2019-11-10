import { Document, PaginateModel } from 'mongoose'
import WriteRepositoryInterface from './writeRepository.interface'
import ReadRepositoryInterface from './readRepository.interface'
import PaginateResultInterface from './paginateResult.interface'

export default class BaseRepository<T extends Document> implements ReadRepositoryInterface<T>, WriteRepositoryInterface<T> {
  protected model: PaginateModel<T>

  constructor (model: PaginateModel<T>) {
    this.model = model
  }

  find = async (query?: object, page?: number, limit?: number, populate?: object | string): Promise<PaginateResultInterface<T>> => {
    const options = {
      page: page || 1,
      limit: limit || 10,
      populate: populate
    }

    try {
      const { docs, totalDocs, limit, totalPages, page } = await this.model.paginate(query, options)
      const result = {
        items: docs,
        pagination: {
          total: totalDocs,
          limit: limit,
          page: page,
          pages: totalPages
        }
      } as PaginateResultInterface<T>
      return Promise.resolve(result)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  findOne = async (query: object, select?: object | string, projection?: object | string): Promise<T> => {
    return this.model.findOne(query, projection).select(select)
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
