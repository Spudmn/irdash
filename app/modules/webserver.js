'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const _ = require('lodash')

let attached = false

class WebServer {
    constructor(publicDir) {
        this.root = publicDir

        this.app = express()
        this.app.use(express.static(this.root))
        this.app.use(bodyParser.json())

        this.http = http.createServer(this.app)
    }

    listen(port = 3000) {
        console.log('http:listen')

        if (!attached) {
            const fallback = (req, res, next) => {
                res.sendFile(`${this.root}/irdash.html`)
            }

            this.app.get('/', fallback)
            this.app.get('*', fallback)

            attached = true
        }

        this.http.listen(port)
    }
}

module.exports = WebServer