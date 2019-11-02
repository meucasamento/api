import PaginateResultInterface from './paginateResult.interface'

export default interface ReadRepository<T> {
    find(query?: object, page?: number, limit?: number): Promise<PaginateResultInterface<T>>
    findOne(query: object): Promise<T>
    exists(query: object): Promise<boolean>
}
