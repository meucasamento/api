"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



class GuestController {
  

  constructor (repository) {;GuestController.prototype.__init.call(this);GuestController.prototype.__init2.call(this);GuestController.prototype.__init3.call(this);GuestController.prototype.__init4.call(this);GuestController.prototype.__init5.call(this);GuestController.prototype.__init6.call(this);GuestController.prototype.__init7.call(this);
    this.repository = repository
  }

  __init() {this.index = async (req, res, next) => {
    const data = req.body
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    try {
      const guests = await this.repository.find(data, page, limit)
      return res.send(guests)
    } catch (error) {
      next(error)
    }
  }}

  __init2() {this.findOne = async (req, res, next) => {
    const { id } = req.params

    try {
      const guest = await this.repository.findOne({ _id: id })

      if (!guest) {
        return res.status(404).send()
      }

      return res.send(guest)
    } catch (error) {
      next(error)
    }
  }}

  __init3() {this.store = async (req, res, next) => {
    const {
      name,
      phone,
      email,
      isActive,
      invitationDelivered,
      isGodfather
    } = req.body

    const guest = {
      name,
      phone,
      email,
      isActive,
      invitationDelivered,
      isGodfather
    } 

    try {
      const newGuest = await this.repository.store(guest)
      return res.send(newGuest)
    } catch (err) {
      next(err)
    }
  }}

  __init4() {this.update = async (req, res, next) => {
    const { id } = req.params
    const {
      name,
      phone,
      email,
      isActive,
      invitationDelivered,
      isGodfather
    } = req.body

    try {
      const guestUpdated = await this.repository.update(id, {
        name,
        phone,
        email,
        isActive,
        invitationDelivered,
        isGodfather
      } )
      return res.send(guestUpdated)
    } catch (error) {
      next(error)
    }
  }}

  __init5() {this.delete = async (req, res, next) => {
    const { id } = req.params

    try {
      await this.repository.delete(id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }}

  __init6() {this.invitation = async (req, res, next) => {
    const { id } = req.params
    const { status } = req.body

    try {
      const guest = await this.repository.invitation(id, status)

      if (!guest) {
        return res.status(404).send()
      }

      return res.send(guest)
    } catch (error) {
      next(error)
    }
  }}

  __init7() {this.active = async (req, res, next) => {
    const { id } = req.params
    const { status } = req.body

    try {
      const guest = await this.repository.update(id, { isActive: status })

      if (!guest) {
        return res.status(404).send()
      }

      return res.send(guest)
    } catch (error) {
      next(error)
    }
  }}
}

exports. default = GuestController
