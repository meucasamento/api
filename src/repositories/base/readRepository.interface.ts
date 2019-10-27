export default interface ReadRepository<T> {
    find(query?: object): Promise<[T]>
    findOne(query: object): Promise<T>
    exists(query: object): Promise<boolean>
}
