import { Request, Response, NextFunction } from 'express'

import UserRepositoryInterface from './../../repositories/users/userRepository.interface'
import TokenManager from '../../utils/components/tokenManager'
import UserInterface from '../../models/v1/users/user.interface.v1'
import Encryption from './../../utils/encryption'
import MailServiceInterface from '../../utils/components/Mail/Mail.service.interface'

class SessionController {
  private userRepository: UserRepositoryInterface
  private mailService: MailServiceInterface

  constructor (userRepository: UserRepositoryInterface,
    mailService: MailServiceInterface) {
    this.userRepository = userRepository
    this.mailService = mailService
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const {
      name,
      email,
      password
    } = req.body

    try {
      const encryptedPassword = await Encryption.hash(password)
      const user = await this.userRepository.store({
        name,
        email,
        password: encryptedPassword
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

  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { email } = req.body
    try {
      const randomstring = Math.random().toString(36).slice(-8)
      const encryptedPassword = await Encryption.hash(randomstring)
      const { _id } = await this.userRepository.findOne({ email })
      await this.userRepository.update(_id, { password: encryptedPassword })
      // await this.mailService.send(email,
      //   'Reset de senha',
      //   'teste')
      return res.json({
        password: randomstring
      })
    } catch (error) {
      next(error)
    }
  }
}

export default SessionController
