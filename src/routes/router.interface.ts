import { Router } from 'express'

export default abstract class RouterInterface {
    readonly router = Router()
}
