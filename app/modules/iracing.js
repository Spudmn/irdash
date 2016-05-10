'use strict'

const EventEmitter = require('events')
const WebSocketClient = require('websocket').client

class iRacing extends EventEmitter {
    constructor(server = 'localhost:8182', fps = 30, ibt = false) {
        super()

        this.server = server
        this.fps = fps
        this.ibt = false
    }

    // @todo getter & setter

    connect() {
        console.log('ir:connect')

        this.ws = new WebSocketClient()
        this.ws.on('connectFailed', (err) => {
            console.error('ir:error', err)
            this.emit('error', err)
        })
        this.ws.on('connect', (con) => {
            con.on('error', (err) => {
                console.error('ir:con:error', err)
                this.emit('error', err)
            })
            con.on('close', () => {
                console.log('ir:con:close')
                this.emit('close')
            })
            con.on('message', (event) => {
                if (event.type !== 'utf8') {
                    return
                }

                const json = JSON.parse(event.utf8Data.replace(/\bNaN\b/g, 'null'))

                console.log('ir:con:message')
                this.emit('message', json)
            })

            con.sendUTF(JSON.stringify({
                fps: this.fps,
                readIbt: this.ibt,
                requestParams: [
                    'DriverInfo',
                    '__all_telemetry__'
                ],
                requestParamsOnce: []
            }))

            this.emit('connect', con)
        })

        this.ws.connect(`ws://${this.server}/ws`)
    }

    disconnect() {
        console.log('ir:disconnect')
        this.ws.close()
        this.ws = null
    }
}

module.exports = iRacing
