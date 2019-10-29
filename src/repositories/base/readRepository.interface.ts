export default interface ReadRepository<T> {
    find(query?: object, page?: number, limit?: number): Promise<[T]>
    findOne(query: object): Promise<T>
    exists(query: object): Promise<boolean>
}
