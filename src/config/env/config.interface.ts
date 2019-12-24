export default interface ConfigInterface {
    port: string,
    authorizationPrefix: string,
    secret: string,
    tokenExpireTime: number,
    mongoURL: string,
    mailgunApiKey: string,
    mailgunDomain: string
}
