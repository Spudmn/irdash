'use strict'

const path = require('path')
const fs = require('fs')
const _ = require('lodash')

const Migration = require('./migration')

const run = function(app) {
    let migrations = []
    _.forEach(fs.readdirSync(path.join(__dirname, 'migrations')), function(file) {
        let migration = require(path.join(__dirname, 'migrations', file))
        if (!(migration.prototype instanceof Migration)) {
            throw new Error(`Migration ${file} does not extend Migration class`)
        }

        migrations.push(new migration())
    })

    _.forEach(migrations, function(migration) {
        if (!migration.run(app)) {
            throw new Error(`Migration ${migration} failed to execute`)
        }
    })
}

module.exports = {
    run: run
}
