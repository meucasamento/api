import ErrorException from './error.exception'

class NotImplemetedException extends ErrorException {
  constructor () {
    super('Method not implemented.', 501)
  }
}

export default new NotImplemetedException()
