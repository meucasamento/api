import GuestInterface from '../../models/v1/guests/guest.interface.v1'
import GuestRepositoryInterface from './guestRepository.interface'
import BaseRepository from './../base/baseRepository'
import NotImplementedException from './../../exceptions/notImplemented.exception'

class GuestRepository extends BaseRepository<GuestInterface> implements GuestRepositoryInterface {
    async confirm(id: string, status: boolean): Promise<GuestInterface> {
        throw NotImplementedException
    }
}

export default new GuestRepository()