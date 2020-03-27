import GuestRepositoryInterface from '../../repositories/guests/guestRepository.interface'
import RouterInterface from '../router.interface'
import GuestController from '../../controllers/v1/guest.controller.v1'
import Auth from '../../middlewares/v1/auth.middleware.v1'
import GuestValidator from '../../validators/v1/guest.validator.v1'

class GuestRouter extends RouterInterface {
  private controller: GuestController
  private validator: GuestValidator

  constructor (repository: GuestRepositoryInterface) {
    super()
    this.controller = new GuestController(repository)
    this.validator = new GuestValidator(repository)
    this.setup()
  }

  private setup = (): void => {
    this.router.use('/guests', Auth.checkToken)
    this.router.get('/guests', this.controller.index)
    this.router.get('/guests/exists', this.controller.exists)
    this.router.post('/guests', this.validator.store, this.validator.validate, this.controller.store)
    this.router.patch('/guests/:id', this.validator.update, this.validator.validate, this.controller.update)
    this.router.delete('/guests/:id', this.controller.delete)
  }
}

export default GuestRouter
