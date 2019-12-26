export default interface ConfigInterface {
    port: number,
    authorizationPrefix: string,
    secret: string,
    tokenExpireTime: number,
    mongoURL: string,
    mailgunApiKey: string,
    mailgunDomain: string
}
