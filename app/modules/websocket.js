'use strict'

const EventEmitter = require('events')
const WebSocketServer = require('websocket').server

class WebSocket extends EventEmitter {
    constructor(http) {
        super()

        this.http = http
    }

    start() {
        console.log('ws:start')

        this.ws = new WebSocketServer({
            httpServer: this.http,
            autoAcceptConnections: true
        })

        this.ws.on('error', (err) => {
            console.error('ws:error', err)
            this.emit('error', err)
        })

        this.ws.on('connect', (con) => {
            con.on('error', (err) => {
                console.log('ws:con:error', err)
                this.emit('error', err)
            })
            con.on('close', (reason, description) => {
                console.log('ws:con:close', reason, description)
                this.emit('close')
            })
            con.on('message', (event) => {
                console.log('ws:con:message')
                this.emit('message', event)
            })

            console.log('ws:connect')
            this.emit('connect', con)
        })
    }

    stop() {
        console.log('ws:stop')
        this.ws.shutDown()
    }
}

module.exports = WebSocket
