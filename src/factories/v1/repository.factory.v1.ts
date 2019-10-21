import RepositoriesFactoryInterface from './repository.factory.interface.v1'

import UserRepositoryInterface from '../../repositories/users/userRepository.interface'
import GuestRepositoryInteface from '../../repositories/guests/guestRepository.interface'
import DashboardRepositoryInterface from '../../repositories/dashboard/dashboardRepository.interface'

import DashboardRepository from '../../repositories/dashboard/dashboardRepository'
import UserRepository from '../../repositories/users/userRepository'
import GuestRepository from '../../repositories/guests/guestRepository'

class RepositoriesFactory implements RepositoriesFactoryInterface {
    dashboardRepository: DashboardRepositoryInterface = DashboardRepository
    userRepository: UserRepositoryInterface = UserRepository
    guestRepository: GuestRepositoryInteface = GuestRepository
}

export default new RepositoriesFactory()
