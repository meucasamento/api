export default interface ReportInterface {
    guests: {
        engaged: number,
        fiancee: number,
        total: number
    },
    godfathers: {
        engaged: number,
        fiancee: number,
        total: number
    },
    invitations: {
        delivered: number,
        undelivered: number
    }
}
