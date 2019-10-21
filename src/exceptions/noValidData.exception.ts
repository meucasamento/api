import ErrorException from './error.exception'

class NoValidDataException extends ErrorException {
  constructor (message?: string) {
    super(message || 'The server understood the request, but is refusing to fulfill it', 403)
  }
}

export default NoValidDataException
