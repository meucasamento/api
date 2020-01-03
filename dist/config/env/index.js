"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var dotenv = _interopRequireWildcard(_dotenv);


class Config  {
  
  
  
  
  
  
  

  constructor () {
    this.setupEnvironments()
    this.setupProperties()
  }

   setupEnvironments () {
    dotenv.config()
    const sulfix = process.env.NODE_ENV
    dotenv.config({ path: `${__dirname}/../../../.env.${sulfix}` })
  }

   setupProperties () {
    this.authorizationPrefix = 'Bearer '
    this.secret = process.env.SECRET
    this.tokenExpireTime = 3600
    this.port = Number(process.env.PORT || 3333)
    this.mongodbURI = process.env.MONGODB_URI
    this.mailgunApiKey = process.env.MAILGUN_API_KEY
    this.mailgunDomain = process.env.MAILGUN_DOMAIN
  }
}

exports. default = new Config()
