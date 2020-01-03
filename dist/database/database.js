"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _env = require('./../config/env'); var _env2 = _interopRequireDefault(_env);

class Database {
  setup () {
    const uri = _env2.default.mongodbURI

    _mongoose2.default.set('useCreateIndex', true)
    _mongoose2.default.set('useFindAndModify', false)

    _mongoose2.default.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    _mongoose2.default.connection.on('error', (err) => {
      console.log('Erro: ', err)
    })

    _mongoose2.default.connection.on('connected', () => {
      if (process.env.NODE_ENV === 'test') { return }
      console.log(`Conectado a ${uri}`)
    })

    _mongoose2.default.connection.on('disconnected', () => {
      console.log(`Desconetado de ${uri}`)
    })

    process.on('SIGINT', () => {
      _mongoose2.default.connection.close(() => {
        process.exit(0)
      })
    })
  }
}

exports. default = new Database()
