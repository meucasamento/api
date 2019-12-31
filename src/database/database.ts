import mongoose from 'mongoose'
import config from './../config/env'

class Database {
  setup (): void {
    const uri = config.mongodbURI

    mongoose.set('useCreateIndex', true)
    mongoose.set('useFindAndModify', false)

    mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    mongoose.connection.on('error', (err) => {
      console.log('Erro: ', err)
    })

    mongoose.connection.on('connected', () => {
      if (process.env.NODE_ENV === 'test') { return }
      console.log(`Conectado a ${uri}`)
    })

    mongoose.connection.on('disconnected', () => {
      console.log(`Desconetado de ${uri}`)
    })

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        process.exit(0)
      })
    })
  }
}

export default new Database()
