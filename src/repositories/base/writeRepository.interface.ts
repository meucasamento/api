export default interface WriteRepository<T> {
    store(data: T): Promise<T>
    update(data: T): Promise<T>
    delete(id: string): Promise<T>
}
