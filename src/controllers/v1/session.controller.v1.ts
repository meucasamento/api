import { Request, Response, NextFunction } from 'express'

import UserRepositoryInterface from './../../repositories/users/userRepository.interface'
import TokenManager from '../../utils/components/tokenManager'
import UserInterface from '../../models/v1/users/user.interface.v1'
import Encryption from './../../utils/encryption'
import MailServiceInterface from '../../utils/components/mail/mail.service.interface'

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
      const user = await this.userRepository.store({
        name,
        email,
        password: password
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

      if (!user) {
        return res.status(401).send()
      }

      const mathPassword = await Encryption.compare(password, user.password)

      if (mathPassword) {
        const data = TokenManager.signUser(user.id)
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
      const randomString = Math.random().toString(36).slice(-8)
      const encryptedPassword = await Encryption.hash(randomString)
      const { id } = await this.userRepository.findOne({ email })
      await this.userRepository.update(id, { password: encryptedPassword })
      await this.mailService.send(email,
        'Reset de senha',
        `Sua senha foi resetada com sucesso, para acesso temporário você deve usar a senha temporária: <strong>${randomString}</strong>.`)
      return res.send()
    } catch (error) {
      next(error)
    }
  }
}

export default SessionController
