import * as dotenv from 'dotenv'
import ConfigInterface from './config.interface'

class Config implements ConfigInterface {
  port: number
  authorizationPrefix: string
  secret: string
  tokenExpireTime: number
  mongodbURI: string
  mailgunApiKey: string
  mailgunDomain: string
  

  constructor () {
    this.setupEnvironments()

    this.port = Number(process.env.PORT || 3333)
    this.authorizationPrefix = 'Bearer '
    this.secret = process.env.SECRET as string
    this.tokenExpireTime = 3600
    this.mongodbURI = process.env.MONGODB_URI as string
    this.mailgunApiKey = process.env.MAILGUN_API_KEY as string
    this.mailgunDomain = process.env.MAILGUN_DOMAIN as string
  }

  private setupEnvironments (): void {
    dotenv.config()
    const sulfix = process.env.NODE_ENV
    dotenv.config({ path: `${__dirname}/../../../.env.${sulfix}` })
  }
}

export default new Config()
