import ErrorException from './error.exception'

class NotFoundException extends ErrorException {
  constructor () {
    super('Not found', 404)
  }
}

export default new NotFoundException()
