import GuestInterface from '../../models/v1/guests/guest.interface.v1'
import PaginateResult from '../../repositories/base/paginateResult.interface'
import GuestRepositoryInterface from '../../repositories/guests/guestRepository.interface'

class GuestRepositoryMock implements GuestRepositoryInterface {
  private fakeGuests (): GuestInterface[] {
    const people = [
      { name: 'Jonatas', email: 'jonatas@gmail.com' },
      { name: 'Deise', email: 'deise@gmail.com' },
      { name: 'Ebert', email: 'ebert@gmail.com' },
      { name: 'Sarah', email: 'sarah@gmail.com' }
    ]
    return people.map((person, index) => {
      return {
        id: `${index}`,
        name: person.name
      } as GuestInterface
    })
  }

  async invitation (id: string, status: boolean): Promise<GuestInterface> {
    const guest = await this.findOne({ id })

    if (guest) {
      guest.invitationDelivered = status
      return Promise.resolve(guest)
    } else {
      return Promise.resolve(undefined)
    }
  }

  find (query?: object, page?: number, limit?: number, populate?: string | object): Promise<PaginateResult<GuestInterface>> {
    const guests = this.fakeGuests()
    const result: PaginateResult<GuestInterface> = {
      items: guests,
      pagination: {
        total: guests.length,
        limit: limit,
        page: page,
        pages: 1
      }
    }
    return Promise.resolve(result)
  }

  async findOne (query: object, select?: string | object, projection?: string | object): Promise<GuestInterface> {
    const { id } = query as GuestInterface
    const guest = this.fakeGuests().find(person => person.id === id)
    return Promise.resolve(guest)
  }

  async exists (query: object): Promise<boolean> {
    const { id } = (query as GuestInterface)
    const guest = await this.findOne({ id })
    return Promise.resolve(guest !== undefined)
  }

  store (object: GuestInterface): Promise<GuestInterface> {
    return Promise.resolve(object)
  }

  update (id: string, data: object): Promise<GuestInterface> {
    throw new Error('Method not implemented.')
  }

  delete (id: string): Promise<GuestInterface> {
    throw new Error('Method not implemented.')
  }
}

export default new GuestRepositoryMock()
