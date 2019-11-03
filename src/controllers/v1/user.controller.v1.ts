import { Request, Response, NextFunction } from 'express'
import UserRepositoryInterface from './../../repositories/users/userRepository.interface'

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
    const { id } = req.params
    const user = req.body

    try {
      const userUpdated = await this.repository.update(id, user)
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
