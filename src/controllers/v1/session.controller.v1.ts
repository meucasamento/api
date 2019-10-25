import { Request, Response } from 'express'
import EmailAlreadyExistsException from './../../exceptions/emailAlreadyExists.exception'

import UserRepositoryInterface from './../../repositories/users/userRepository.interface'
import TokenManager from '../../utils/components/tokenManager'
import config from '../../config'
import { NextFunction } from 'connect'

class SessionController {
  private userRepository: UserRepositoryInterface

  constructor (userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
  }

  registration = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { email } = req.body
    const hasExists = (await this.userRepository.find({ email })).length > 0

    if (hasExists) {
      next(new EmailAlreadyExistsException(email))
    }

    return res.send()
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body

    if (username === 'dev' && password === '123') {
      const token = TokenManager.sign({ username }, config.secret, config.tokenExpireTime)
      return res.send({ token: token, expiresIn: config.tokenExpireTime })
    } else {
      return res.status(401).send()
    }
  }

  resetPassword = async (req: Request, res: Response): Promise<Response> => {
    return res.send()
  }
}

export default SessionController
