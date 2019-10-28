import GuestInterface from './../../models/v1/guests/guest.interface.v1'
import ReadRepositoryInterface from './../base/readRepository.interface'
import WriteRepositoryInterface from './../base/writeRepository.interface'

export default interface GuestRepositoryInterface extends ReadRepositoryInterface<GuestInterface>, WriteRepositoryInterface<GuestInterface> {
    invitation(id: string, status: boolean): Promise<GuestInterface>
}
