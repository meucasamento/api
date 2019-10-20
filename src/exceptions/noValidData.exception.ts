import HTTPException from './http.exception'

class NoValidDataException extends HTTPException {
    constructor(message?: string) {
        super(403, message || 'The server understood the request, but is refusing to fulfill it')
    }
}

export default NoValidDataException