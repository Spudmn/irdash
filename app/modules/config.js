'use strict'

const EventEmitter = require('events')
const _ = require('lodash')

class Config extends EventEmitter {
    constructor(dir) {
        super()

        this.dir = dir
    }

    all() {
        return _.extend(this.defaults(), this.load())
    }

    defaults() {
        return {}
    }

    load() {
        return {}
    }

    save() {
        return true
    }

    watch() {
    }
}

module.exports = Config
