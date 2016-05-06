'use strict'

const path = require('path')
const fs = require('fs')

const Migration = require('../migration')

class v040 extends Migration {
    run(app) {
        const oldPath = path.join(app.getPath('userData'), 'config.json')
        const newPath = path.join(app.getPath('userData'), 'window.json')

        try {
            let stat = fs.statSync(oldPath)
        } catch (err) {
            return true
        }

        fs.renameSync(oldPath, newPath)

        return true
    }
}

module.exports = v040
