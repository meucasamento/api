import GuestInterface from '../../models/v1/guests/guest.interface.v1'
import GuestRepositoryInterface from './guestRepository.interface'
import BaseRepository from './../base/baseRepository'
import NotImplementedException from './../../exceptions/notImplemented.exception'
import GuestModel from './../../models/v1/guests/guest.model.v1'

class GuestRepository extends BaseRepository<GuestInterface> implements GuestRepositoryInterface {
    constructor() {
        super(GuestModel)
    }

    async confirm(id: string, status: boolean): Promise<GuestInterface> {
        throw NotImplementedException
    }
}

export default new GuestRepository()