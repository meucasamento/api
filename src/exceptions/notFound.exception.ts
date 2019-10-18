import HTTPException from './http.exception'

class NotFoundException extends HTTPException {
    constructor() {
        super(404, 'Not found')
    }
}

export default new NotFoundException()