import DashboardRepositoryInterface from './dashboardRepository.interface'
import ReportInterface from '../../models/v1/dashboard/report.interface.v2'
import GuestModel from './../../models/v1/guests/guest.model.v1'

class DashboardRepository implements DashboardRepositoryInterface {
  async report (): Promise<ReportInterface> {
    try {
      const guests = await GuestModel.find()
      const engagedGuests = guests.filter(guest => guest.guestOf === "adriano")
      const fianceeGuests = guests.filter(guest => guest.guestOf === "jenifer")
      const totalEngagedGuests = engagedGuests.reduce((prev, guest) => prev + (guest.peopleCount ?? 0), 0)
      const totalFianceeGuests = fianceeGuests.reduce((prev, guest) => prev + (guest.peopleCount ?? 0), 0)

      const engagedGodfathers = engagedGuests.filter(guest => guest.isGodfather).length
      const fianceeGodfathers = fianceeGuests.filter(guest => guest.isGodfather).length

      const delivered = guests.filter(guest => { return guest.invitationDelivered }).length
      const undelivered = guests.filter(guest => { return !guest.invitationDelivered }).length

      const report = {
        guests: {
          engaged: totalEngagedGuests,
          fiancee: totalFianceeGuests,
          total: totalEngagedGuests + totalFianceeGuests
        },
        godfathers: {
            engaged: engagedGodfathers,
            fiancee: fianceeGodfathers,
            total: engagedGodfathers + fianceeGodfathers
        },
        invitations: {
            delivered,
            undelivered,
            total: delivered + undelivered
        }
      }

      return Promise.resolve(report)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default new DashboardRepository()
