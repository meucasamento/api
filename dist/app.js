"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _express = require('express');

var _database = require('./database/database'); var _database2 = _interopRequireDefault(_database);

var _routerv1 = require('./routes/v1/router.v1'); var _routerv12 = _interopRequireDefault(_routerv1);
var _errormiddlewarev1 = require('./middlewares/v1/error.middleware.v1'); var _errormiddlewarev12 = _interopRequireDefault(_errormiddlewarev1);




class App {
  
  

  constructor (server,
    repositoryFactory,
    emailService) {
    this.server = server
    this.routerV1 = new (0, _routerv12.default)(repositoryFactory, emailService)
  }

   setup () {
    _database2.default.setup()
    this.middlewares()
    this.routes()
  }

   middlewares () {
    this.server.use(_helmet2.default.call(void 0, ))
    this.server.use(_express.json.call(void 0, ))
    this.server.use(_cors2.default.call(void 0, ))
    this.server.use(_bodyparser2.default.json())
    this.server.use(_errormiddlewarev12.default.checkError)
  }

   routes () {
    this.server.use('/api/v1', this.routerV1.router)
  }
}

exports. default = App
