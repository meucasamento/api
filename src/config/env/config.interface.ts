export default interface ConfigInterface {
    port: number,
    authorizationPrefix: string,
    secret: string,
    tokenExpireTime: number,
    mongodbURI: string,
    mailgunApiKey: string,
    mailgunDomain: string
}
