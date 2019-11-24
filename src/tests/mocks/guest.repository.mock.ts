import GuestInterface from '../../models/v1/guests/guest.interface.v1'
import PaginateResult from '../../repositories/base/paginateResult.interface'
import GuestRepositoryInterface from '../../repositories/guests/guestRepository.interface'

class GuestRepositoryMock implements GuestRepositoryInterface {
  private fakeGuests (): GuestInterface[] {
    const people = [
      { name: 'Jonatas', email: '' },
      { name: 'Deise', email: '' },
      { name: 'Ebert', email: '' },
      { name: 'Sarah', email: '' }
    ]
    return people.map((person, index) => {
      return {
        id: `${index}`,
        name: person.name
      } as GuestInterface
    })
  }

  invitation (id: string, status: boolean): Promise<GuestInterface> {
    throw new Error('Method not implemented.')
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

  findOne (query: object, select?: string | object, projection?: string | object): Promise<GuestInterface> {
    throw new Error('Method not implemented.')
  }

  exists (query: object): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  store (object: GuestInterface): Promise<GuestInterface> {
    throw new Error('Method not implemented.')
  }

  update (id: string, data: object): Promise<GuestInterface> {
    throw new Error('Method not implemented.')
  }

  delete (id: string): Promise<GuestInterface> {
    throw new Error('Method not implemented.')
  }
}

export default new GuestRepositoryMock()
