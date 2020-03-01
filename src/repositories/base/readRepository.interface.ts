import PaginateResultInterface from './paginateResult.interface'

export default interface ReadRepository<T> {
    find(query?: object, page?: number, limit?: number, populate?: object | string, sort?: object | string): Promise<PaginateResultInterface<T>>
    findOne(query: object, select?: object | string, projection?: object | string): Promise<T>
    exists(query: object): Promise<boolean>
}
