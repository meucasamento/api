import App from './app'
import config from './config'

import RepositoriesFactory from './factories/v1/repository.factory.v1'

const app = new App(RepositoriesFactory).express

app.listen(config.port, () => {
    console.log(`App listening on the port ${config.port}`);
})
