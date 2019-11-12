import GuestRepositoryInterface from '../../repositories/guests/guestRepository.interface'
import RouterInterface from '../router.interface'
import GuestController from '../../controllers/v1/guest.controller.v1'
import Auth from '../../middlewares/v1/auth.middleware.v1'
import GuestRequestValidator from '../../validators/v1/guestRequest.validator.v1'

class GuestRouter extends RouterInterface {
  private controller: GuestController
  private validator: GuestRequestValidator

  constructor (repository: GuestRepositoryInterface) {
    super()
    this.controller = new GuestController(repository)
    this.validator = new GuestRequestValidator(repository)
    this.setup()
  }

  private setup = (): void => {
    this.router.use('/guests', Auth.checkToken)
    this.router.get('/guests', this.controller.index)
    this.router.get('/guests/:id', this.validator.findOne, this.validator.validate, this.controller.findOne)
    this.router.post('/guests', this.controller.store)
    this.router.patch('/guests/:id', this.controller.update)
    this.router.patch('/guests/:id/invitation', this.controller.invitation)
    this.router.delete('/guests/:id', this.controller.delete)
  }
}

export default GuestRouter
