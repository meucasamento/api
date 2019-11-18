export default interface MailServiceInterface {
    send(email: string, subject?: string, body?: string): Promise<void>
}
