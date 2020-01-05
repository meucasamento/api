import { Request, Response, NextFunction } from 'express'
import UserRepositoryInterface from './../../repositories/users/userRepository.interface'
import TokenManager from '../../utils/components/tokenManager'

class UserController {
  private repository: UserRepositoryInterface

  constructor (repository: UserRepositoryInterface) {
    this.repository = repository
  }

  index = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const data = req.body
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    try {
      const users = await this.repository.find(data, page, limit)
      return res.send(users)
    } catch (error) {
      next(error)
    }
  }

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params

    try {
      const user = await this.repository.findOne({ _id: id })
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const token = req.headers.authorization
    const { name, email } = req.body

    try {
      const { _id } = await TokenManager.verify(token)
      const userUpdated = await this.repository.update(_id, { name, email })
      const newToken = TokenManager.signUser(_id)
      return res.send({
        user: userUpdated,
        token: newToken
      })
    } catch (error) {
      next(error)
    }
  }

  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const token = req.headers.authorization
    const { newPassword } = req.body

    try {
      const { _id } = TokenManager.verify(token)
      await this.repository.changePassword(_id, newPassword)
      const updatedToken = await TokenManager.signUser(_id)
      return res.send(updatedToken)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
