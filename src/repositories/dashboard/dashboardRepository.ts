import DashboardRepositoryInterface from './dashboardRepository.interface'
import ReportInterface from '../../models/v1/dashboard/report.interface.v2'
import ErrorException from '../../exceptions/error.exception'
import GuestModel from './../../models/v1/guests/guest.model.v1'

class DashboardRepository implements DashboardRepositoryInterface {
  async report (): Promise<ReportInterface> {
    return new Promise<ReportInterface>((resolve, reject) => {
      GuestModel.find().then(result => {
        const totalGuests = result.length
        const totalGodparents = result.filter(guest => { return guest.isGodfather }).length
        const totalDelivered = result.filter(guest => { return guest.isConfirmed }).length
        const totalUndelivered = result.filter(guest => { return !guest.isConfirmed }).length
        const report = {
          guests: totalGuests,
          godparents: totalGodparents,
          invitationsDelivered: totalDelivered,
          undeliverableInvitations: totalUndelivered
        }
        resolve(report)
      }).catch(error => {
        reject(new ErrorException(error.message))
      })
    })
  }
}

export default new DashboardRepository()
