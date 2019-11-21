import * as mongoose from 'mongoose'
import config from './../config'

class Database {
  setup (): void {
    mongoose.set('useCreateIndex', true)
    mongoose.set('useFindAndModify', false)

    mongoose.connect(config.mongoURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    mongoose.connection.on('connected', function () {
      console.log(`Mongoose default connection open to ${config.mongoURL}`)
    })

    mongoose.connection.on('error', function (err) {
      console.log(`Mongoose default connection error: ${err}`)
    })

    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected')
    })

    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
      })
    })
  }
}

export default new Database()
