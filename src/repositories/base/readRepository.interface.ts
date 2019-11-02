import PaginateResultInterface from './paginateResult.interface'

export default interface ReadRepository<T> {
    find(query?: object, page?: number, limit?: number, projection?: object | string): Promise<PaginateResultInterface<T>>
    findOne(query: object, projection?: object | string): Promise<T>
    exists(query: object): Promise<boolean>
}
