export default interface PaginateResultInterface<T> {
    items: T[]
    pagination: {
        total: number
        limit: number
        page?: number
        pages?: number
    }
}
