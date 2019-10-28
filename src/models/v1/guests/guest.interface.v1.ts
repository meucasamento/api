export default interface GuestInterface {
    id: string
    name: string
    phone?: string
    email?: string
    createdIn: number
    updatedIn: number
    isActive?: boolean
    invitationDelivered?: boolean
    isGodfather?: boolean
}
