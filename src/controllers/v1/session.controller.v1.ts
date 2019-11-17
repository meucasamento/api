import { Request, Response, NextFunction } from 'express'

import UserRepositoryInterface from './../../repositories/users/userRepository.interface'
import TokenManager from '../../utils/components/tokenManager'
import UserInterface from '../../models/v1/users/user.interface.v1'
import Encryption from './../../utils/encryption'

class SessionController {
  private userRepository: UserRepositoryInterface

  constructor (userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const {
      name,
      email,
      password
    } = req.body

    try {
      const user = await this.userRepository.store({
        name,
        email,
        password
      } as UserInterface)
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  authentication = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const {
      email,
      password
    } = req.body

    try {
      const user = await this.userRepository.findOne({ email }, '+password')
      const mathPassword = await Encryption.compare(password, user.password)

      if (mathPassword) {
        const data = TokenManager.sign({ id: user._id })
        return res.send(data)
      } else {
        return res.status(401).send()
      }
    } catch (error) {
      next(error)
    }
  }

  resetPassword = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body

    return res.send()
  }
}

export default SessionController
