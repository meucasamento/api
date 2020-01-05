"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);

class App {
  
   __init() {this.routes = _express.Router.call(void 0, )}

   constructor () {;App.prototype.__init.call(this);
    this.express = _express2.default.call(void 0, )
    this.routes.get('/users', (req, res) => {
      res.json({ name: 'Adriano Souza Costa' })
    })
    this.express.use(this.routes)
    this.express.use(_express2.default.json())
  }
}

exports. default = new App().express
