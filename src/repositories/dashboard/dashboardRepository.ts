import DashboardRepositoryInterface from './dashboardRepository.interface'
import ReportInterface from '../../models/v1/dashboard/report.interface.v2'

class DashboardRepository implements DashboardRepositoryInterface {
    async report(): Promise<ReportInterface> {
        return <ReportInterface>{
            guests: 123,
            godparents: 6,
            invitationsDelivered: 100,
            undeliverableInvitations: 20
        }
    }
}

export default new DashboardRepository()