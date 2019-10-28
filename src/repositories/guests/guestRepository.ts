import { Document } from 'mongoose'
import GuestInterface from '../../models/v1/guests/guest.interface.v1'
import GuestRepositoryInterface from './guestRepository.interface'
import BaseRepository from './../base/baseRepository'
import GuestModel from './../../models/v1/guests/guest.model.v1'

class GuestRepository extends BaseRepository<GuestInterface & Document> implements GuestRepositoryInterface {
  constructor () {
    super(GuestModel)
  }

  async confirm (id: string, status: boolean): Promise<GuestInterface> {
    try {
      const guest = await this.update(id, { isConfirmed: status })
      return Promise.resolve(guest)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default new GuestRepository()
