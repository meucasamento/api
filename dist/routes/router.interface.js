"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

 class RouterInterface {constructor() { RouterInterface.prototype.__init.call(this); }
     __init() {this.router = _express.Router.call(void 0, )}
} exports.default = RouterInterface;
