import DashboardRepositoryInterface from './dashboardRepository.interface'
import ReportInterface from '../../models/v1/dashboard/report.interface.v2'
import GuestModel from './../../models/v1/guests/guest.model.v1'

class DashboardRepository implements DashboardRepositoryInterface {
  async report (): Promise<ReportInterface> {
    try {
      const result = await GuestModel.find()

      const totalGuests = result.length
      const totalGodparents = result.filter(guest => { return guest.isGodfather }).length
      const totalDelivered = result.filter(guest => { return guest.invitationDelivered }).length
      const totalUndelivered = result.filter(guest => { return !guest.invitationDelivered }).length
      const report = {
        guests: totalGuests,
        godparents: totalGodparents,
        invitationsDelivered: totalDelivered,
        undeliverableInvitations: totalUndelivered
      }

      return Promise.resolve(report)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default new DashboardRepository()
