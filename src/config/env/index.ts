import * as dotenv from 'dotenv'
import ConfigInterface from './config.interface'

class Config implements ConfigInterface {
  authorizationPrefix: string
  secret: string
  tokenExpireTime: number
  port: string
  mongoURL: string
  mailgunApiKey: string
  mailgunDomain: string

  constructor () {
    this.setupEnvironmentOrigin()
    this.setupProperties()
  }

  private setupEnvironmentOrigin (): void {
    dotenv.config()
    let path: string
    switch (process.env.NODE_ENV) {
      case 'test':
        path = `${__dirname}./../../../.env.test`
        break
      case 'production':
        path = `${__dirname}/../../../.env.production`
        break
      default:
        path = `${__dirname}/../../../.env.development`
    }
    dotenv.config({ path })
  }

  private setupProperties (): void {
    this.authorizationPrefix = 'Bearer '
    this.secret = process.env.SECRET
    this.tokenExpireTime = 3600
    this.port = process.env.PORT
    this.mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_PATH}`
    this.mailgunApiKey = process.env.MAILGUN_API_KEY
    this.mailgunDomain = process.env.MAILGUN_DOMAIN
  }
}

export default new Config()
