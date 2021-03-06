import { Request, Response, NextFunction } from 'express'
import GuestRepositoryInterface from './../../repositories/guests/guestRepository.interface'
import GuestInterface from '../../models/v1/guests/guest.interface.v1'

class GuestController {
  private repository: GuestRepositoryInterface

  constructor (repository: GuestRepositoryInterface) {
    this.repository = repository
  }

  index = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const query = req.body
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const sort = {
      isGodfather: -1,
      guestOf: -1,
      name: "asc"
    }

    try {
      const guests = await this.repository.find(query, page, limit, undefined, sort)
      return res.send(guests)
    } catch (error) {
      next(error)
    }
  }

  store = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const guest = req.body as GuestInterface

    try {
      const newGuest = await this.repository.store(guest)
      return res.send(newGuest)
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params
    const updatedGuest = req.body as GuestInterface

    try {
      const guestUpdated = await this.repository.update(id, updatedGuest)
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

  exists = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { name } = req.query
    const exists = await this.repository.exists({name})
    res.send({ exists })
  }

}

export default GuestController
