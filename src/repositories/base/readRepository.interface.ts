export default interface ReadRepository<T> {
    find(query?: object): Promise<[T]>
    findOne(id: string | number): Promise<T>
}
