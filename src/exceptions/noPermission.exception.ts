import HTTPException from './http.exception'

class NoPermissionException extends HTTPException {
    constructor() {
        super(401, 'No Permission')
    }
}

export default new NoPermissionException()