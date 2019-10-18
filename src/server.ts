import App from './app'
import RepositoriesFactory from './factories/v1/repository.factory.v1'

const app = new App(RepositoriesFactory).express

app.listen('3333')
