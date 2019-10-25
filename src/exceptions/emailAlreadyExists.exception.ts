import ErrorException from './error.exception'

class EmailAlreadyExistsException extends ErrorException {
  constructor (email: string) {
    super(`The email ${email} already exists. Change to another email and try again please.`, 403)
  }
}

export default EmailAlreadyExistsException
