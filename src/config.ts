import 'dotenv/config'

class Config {
    authorizationPrefix = 'Bearer '
    secret = process.env.SECRET
    tokenExpireTime = 3600
    port = process.env.PORT
    mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_PATH}`
    mailgunApiKey = process.env.MAILGUN_API_KEY
    mailgunDomain = process.env.MAILGUN_DOMAIN
}

export default new Config()
