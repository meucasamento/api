export default interface WriteRepository<T> {
    store(object: T): Promise<T>
    update(id: string, object: T): Promise<T>
    delete(id: string): Promise<T>
}
