import { Router } from 'express'
import GuestRepositoryInterface from '../../repositories/guests/guestRepository.interface'
import GuestController from '../../controllers/v1/guest.controller.v1'
import auth from '../../middlewares/v1/auth.middleware.v1'

class GuestRoutes {
  readonly router = Router()

  private controller: GuestController

  constructor (repository: GuestRepositoryInterface) {
    this.controller = new GuestController(repository)
    this.setup()
  }

  private setup = (): void => {
    this.router.use('/guests', auth.checkToken)
    this.router.get('/guests', this.controller.index)
    this.router.get('/guests/:id', this.controller.findOne)
    this.router.post('/guests', this.controller.store)
    this.router.patch('/guests/:id', this.controller.update)
    this.router.patch('/guests/:id/invitation', this.controller.invitation)
    this.router.delete('/guests/:id', this.controller.delete)
  }
}

export default GuestRoutes
