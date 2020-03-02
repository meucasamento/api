import { Document } from 'mongoose'
import GuestInterface from '../../models/v1/guests/guest.interface.v1'
import GuestRepositoryInterface from './guestRepository.interface'
import BaseRepository from './../base/baseRepository'
import GuestModel from './../../models/v1/guests/guest.model.v1'

class GuestRepository extends BaseRepository<GuestInterface & Document> implements GuestRepositoryInterface {
  constructor () {
    super(GuestModel)
  }
}

export default new GuestRepository()
