import ErrorException from './error.exception'

class NoPermissionException extends ErrorException {
  constructor () {
    super('No Permission', 401)
  }
}

export default new NoPermissionException()
