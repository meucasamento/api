export default interface ReadRepository<T> {
    find(data?: string | number | object): Promise<[T]>
    findOne(id: string | number): Promise<T>
}
