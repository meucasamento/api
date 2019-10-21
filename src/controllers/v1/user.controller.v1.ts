import { Request, Response, NextFunction } from 'express'
import UserRepositoryInterface from './../../repositories/users/userRepository.interface'

class UserController {
  private repository: UserRepositoryInterface

  constructor (repository: UserRepositoryInterface) {
    this.repository = repository
  }

  index = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const data = req.body

    try {
      const users = await this.repository.find(data)
      return res.send(users)
    } catch (error) {
      next(error)
    }
  }

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params

    try {
      const users = await this.repository.findOne(id)
      return res.send(users)
    } catch (error) {
      next(error)
    }
  }

  search = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { query } = req.query

    try {
      const users = await this.repository.find(query)
      return res.send(users)
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const user = req.body

    try {
      const userUpdated = await this.repository.update(user)
      return res.send(userUpdated)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.body

    try {
      await this.repository.delete(id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { currentPassword, newPassword } = req.body

    try {
      await this.repository.changePassword(currentPassword, newPassword)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
