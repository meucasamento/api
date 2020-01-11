"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _env = require('./config/env'); var _env2 = _interopRequireDefault(_env);
var _mailgunservice = require('./utils/components/mail/mailgun.service'); var _mailgunservice2 = _interopRequireDefault(_mailgunservice);
var _repositoryfactoryv1 = require('./factories/v1/repository.factory.v1'); var _repositoryfactoryv12 = _interopRequireDefault(_repositoryfactoryv1);

const app = new (0, _app2.default)(_repositoryfactoryv12.default, _mailgunservice2.default)

app.express.listen(_env2.default.port, () => {
  console.log(`App listening on the port ${_env2.default.port}`)
})