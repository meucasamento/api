export default interface PaginateResult<T> {
    items: T[]
    pagination: {
        total: number
        limit: number
        page?: number
        pages?: number
    }
}
