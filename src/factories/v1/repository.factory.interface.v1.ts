import UserRepositoryInteface from '../../repositories/users/userRepository.interface'
import GuestRepositoryInteface from '../../repositories/guests/guestRepository.interface'
import DashboardRepositoryInterface from '../../repositories/dashboard/dashboardRepository.interface'

export default interface RepositoryFactoryInterface {
    userRepository: UserRepositoryInteface
    guestRepository: GuestRepositoryInteface
    dashboardRepository: DashboardRepositoryInterface
}