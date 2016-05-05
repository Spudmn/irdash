'use strict'

const jsonfile = require('jsonfile')
const path     = require('path')
const _        = require('lodash')

class Kutu {
    constructor(app, ipc) {
        this.defaults = jsonfile.readFileSync(path.join(__dirname, '..', '..', 'configs', 'kutu.json'))
        this.path     = path.join(app.getPath('userData'), 'kutu.json')

        ipc.on('getKutu', (event) => {
            event.returnValue = this.load()
        })

        ipc.on('setKutu', (event, config) => {
            event.returnValue = this.save(config).load()
        })
    }

    load() {
        try {
            return _.extend(this.defaults, jsonfile.readFileSync(this.path))
        } catch(err) {
            return this.defaults
        }
    }

    save(config) {
        jsonfile.writeFileSync(this.path, config)

        return this
    }
}

module.exports = Kutu
