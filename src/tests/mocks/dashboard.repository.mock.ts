import DashboardInterface from '../../repositories/dashboard/dashboardRepository.interface'
import ReportInterface from '../../models/v1/dashboard/report.interface.v2'

class DashboardRepositoryMock implements DashboardInterface {
    guests: number
    godparents: number
    invitationsDelivered: number
    undeliverableInvitations: number

    constructor (guests: number,
      godparents: number,
      invitationsDelivered: number,
      undeliverableInvitations: number) {
      this.guests = guests
      this.godparents = godparents
      this.invitationsDelivered = invitationsDelivered
      this.undeliverableInvitations = undeliverableInvitations
    }

    async report (): Promise<ReportInterface> {
      return Promise.resolve({
        guests: this.guests,
        godparents: this.godparents,
        invitationsDelivered: this.invitationsDelivered,
        undeliverableInvitations: this.undeliverableInvitations
      })
    }
}

export default DashboardRepositoryMock
