import { Request, Response, NextFunction } from 'express'

import GuestInterface from './../../models/v1/guests/guest.interface.v1'
import GuestRepositoryInterface from './../../repositories/guests/guestRepository.interface'
import NotImplementedException from '../../exceptions/notImplemented.exception'

class GuestController {

  private repository: GuestRepositoryInterface

  constructor(repository: GuestRepositoryInterface) {
    this.repository = repository
  }

  index = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const data = req.body

    try {
      const guests = await this.repository.find(data)
      return res.send(guests)
    } catch (error) {
      next(error)
    }
  }

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params

    try {
      const guests = await this.repository.findOne(id)
      return res.send(guests)
    } catch (error) {
      next(error)
    }
  }

  store = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const guest = <GuestInterface>req.body

    try {
      const newGuest = await this.repository.store(guest)
      return res.send(newGuest)
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const user = <GuestInterface>req.body

    try {
      const userUpdated = await this.repository.update(user)
      return res.send(userUpdated)
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

  confirm = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { id } = req.params
    const { status } = req.body

    try {
      const guest = await this.repository.confirm(id, status)
      return res.send(guest)
    } catch (error) {
      next(error)
    }
  }
}

export default GuestController
