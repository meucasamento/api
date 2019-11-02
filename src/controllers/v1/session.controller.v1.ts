import { Request, Response, NextFunction } from 'express'
import EmailAlreadyExistsException from './../../exceptions/emailAlreadyExists.exception'

import UserRepositoryInterface from './../../repositories/users/userRepository.interface'
import TokenManager from '../../utils/components/tokenManager'

class SessionController {
  private userRepository: UserRepositoryInterface

  constructor (userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
  }

  registration = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { email } = req.body
    const hasExists = (await this.userRepository.find({ email }))

    if (hasExists) {
      next(new EmailAlreadyExistsException(email))
    }

    return res.send()
  }

  authentication = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body
    const user = await this.userRepository.findOne({ email, password })

    if (user) {
      const data = TokenManager.sign({ id: user._id })
      return res.send(data)
    } else {
      return res.status(401).send()
    }
  }

  resetPassword = async (req: Request, res: Response): Promise<Response> => {
    return res.send()
  }
}

export default SessionController
