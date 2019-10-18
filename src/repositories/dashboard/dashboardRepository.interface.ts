import ReportInterface from './../../models/v1/dashboard/report.interface.v2'

export default interface DashboardRepositoryInterface {
    report(): Promise<ReportInterface>
}