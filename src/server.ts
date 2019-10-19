import App from './app'

import config from './utils/config/config'
import RepositoriesFactory from './factories/v1/repository.factory.v1'

const app = new App(RepositoriesFactory).express

app.listen(config.port)
