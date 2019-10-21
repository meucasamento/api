class ErrorException extends Error {
    readonly status: number

    constructor (message: string, status = 500) {
      super(message)
      this.status = status
    }
}

export default ErrorException
