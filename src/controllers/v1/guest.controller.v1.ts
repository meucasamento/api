import { Request, Response, NextFunction } from 'express'
import GuestRepositoryInterface from './../../repositories/guests/guestRepository.interface'

class GuestController {
  private repository: GuestRepositoryInterface

  constructor (repository: GuestRepositoryInterface) {
    this.repository = repository
  }

  index = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const data = req.body
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    try {
      const guests = await this.repository.find(data, page, limit)
      return res.send(guests)
    } catch (error) {
      next(error)
    }
  }

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params

    try {
      const guests = await this.repository.findOne({ _id: id })
      return res.send(guests)
    } catch (error) {
      next(error)
    }
  }

  store = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const guest = req.body

    try {
      const newGuest = await this.repository.store(guest)
      return res.send(newGuest)
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params
    const guest = req.body

    try {
      const guestUpdated = await this.repository.update(id, guest)
      return res.send(guestUpdated)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params

    try {
      await this.repository.delete(id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  invitation = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params
    const { status } = req.body

    try {
      const guest = await this.repository.invitation(id, status)
      return res.send(guest)
    } catch (error) {
      next(error)
    }
  }
}

export default GuestController
