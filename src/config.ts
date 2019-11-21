import 'dotenv/config'

class Config {
    authorizationPrefix = 'Bearer '
    secret = process.env.SECRET as string
    tokenExpireTime = 3600 as number
    port = process.env.PORT as string
    mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_PATH}`
    mailgunApiKey = process.env.MAILGUN_API_KEY as string
    mailgunDomain = process.env.MAILGUN_DOMAIN as string
}

export default new Config()
