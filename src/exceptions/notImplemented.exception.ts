import HTTPException from './http.exception'

class NotImplemetedException extends HTTPException {
    constructor() {
        super(501, 'Method not implemented.')
    }
}

export default new NotImplemetedException()