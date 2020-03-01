import { Request, Response, NextFunction } from 'express'
import GuestRepositoryInterface from './../../repositories/guests/guestRepository.interface'
import GuestInterface from '../../models/v1/guests/guest.interface.v1'

class GuestController {
  private repository: GuestRepositoryInterface

  constructor (repository: GuestRepositoryInterface) {
    this.repository = repository
  }

  index = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const data = req.body
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const sort = { 
      name: "asc"
    }

    try {
      const guests = await this.repository.find(data, page, limit, sort)
      return res.send(guests)
    } catch (error) {
      next(error)
    }
  }

  store = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const {
      name,
      phone,
      email,
      isActive,
      invitationDelivered,
      isGodfather
    } = req.body

    const guest = {
      name,
      phone,
      email,
      isActive,
      invitationDelivered,
      isGodfather
    } as GuestInterface

    try {
      const newGuest = await this.repository.store(guest)
      return res.send(newGuest)
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params
    const {
      name,
      phone,
      email,
      isActive,
      invitationDelivered,
      isGodfather
    } = req.body

    try {
      const guestUpdated = await this.repository.update(id, {
        name,
        phone,
        email,
        isActive,
        invitationDelivered,
        isGodfather
      } as GuestInterface)
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

}

export default GuestController
