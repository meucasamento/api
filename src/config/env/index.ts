import * as dotenv from 'dotenv'
import ConfigInterface from './config.interface'

class Config implements ConfigInterface {
  authorizationPrefix: string
  secret: string
  tokenExpireTime: number
  port: number
  mongodbURI: string
  mailgunApiKey: string
  mailgunDomain: string

  constructor () {
    this.setupEnvironments()
    this.setupProperties()
  }

  private setupEnvironments (): void {
    dotenv.config()
    const sulfix = process.env.NODE_ENV
    dotenv.config({ path: `${__dirname}/../../../.env.${sulfix}` })
  }

  private setupProperties (): void {
    this.authorizationPrefix = 'Bearer '
    this.secret = process.env.SECRET
    this.tokenExpireTime = 3600
    this.port = Number(process.env.PORT || 3333)
    this.mongodbURI = process.env.MONGODB_URI
    this.mailgunApiKey = process.env.MAILGUN_API_KEY
    this.mailgunDomain = process.env.MAILGUN_DOMAIN
  }
}

export default new Config()
