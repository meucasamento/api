import { NextFunction, Request, Response } from 'express';
import HttpException from './../../exceptions/http.exception'

class ErrorMiddleware {
    checkError(error: HttpException, re: Request, res: Response, next: NextFunction) {
        const message = error.message

        if (message) {
            res.status(error.status).send({ message })
        }

        res.status(error.status).send()
    }
}

export default new ErrorMiddleware()