export default interface WriteRepository<T> {
    store(object: T): Promise<T>
    update(id: string, data: object): Promise<T>
    delete(id: string): Promise<T>
}
