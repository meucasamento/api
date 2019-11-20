import UserRepositoryInterface from '../../repositories/users/userRepository.interface'
import GuestRepositoryInterface from '../../repositories/guests/guestRepository.interface'
import DashboardRepositoryInterface from '../../repositories/dashboard/dashboardRepository.interface'
import RepositoryFactoryInterface from '../../factories/v1/repository.factory.interface.v1'

import UserRepositoryMock from './user.repository.mock'
import GuestRepositoryMock from './guest.repository.mock'
import DashboardRepositoryMock from './dashboard.repository.mock'

class RespositoryFactoryMock implements RepositoryFactoryInterface {
    userRepository: UserRepositoryInterface
    guestRepository: GuestRepositoryInterface
    dashboardRepository: DashboardRepositoryInterface

    constructor (userRepository: UserRepositoryInterface,
      guestRepository: GuestRepositoryInterface,
      dashboardRepository: DashboardRepositoryInterface) {
      this.userRepository = userRepository
      this.guestRepository = guestRepository
      this.dashboardRepository = dashboardRepository
    }
}

export default new RespositoryFactoryMock(UserRepositoryMock,
  GuestRepositoryMock,
  new DashboardRepositoryMock(3, 1, 1, 2))
