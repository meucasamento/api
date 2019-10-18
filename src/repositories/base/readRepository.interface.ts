export default interface ReadRepository<T> {
    find(data?: string | number | object): Promise<[T]>
    findOne(data: string | number | object): Promise<T>
}
