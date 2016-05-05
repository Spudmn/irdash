const EventEmitter = require('events')

class iRacing extends EventEmitter {
    constructor(server = '127.0.0.1:8182', params = [], once = [], fps = 30, ibt = false) {
        super()

        this.server = server
        this.params = params
        this.once   = once
        this.fps    = fps
        this.ibt    = ibt

        this.reconnect = null
        this.firstTime = true
        this.connected = false
        this.running   = false
        this.data      = {}
        this.ws        = null

        this.connect()
    }

    connect() {
        this.ws = new WebSocket(`ws://${this.server}/ws`)
        this.ws.onopen = (...args) => {
            this.open(...args)
        }
        this.ws.onerror = (...args) => {
            this.error(...args)
        }
        this.ws.onmessage = (...args) => {
            this.message(...args)
        }
        this.ws.onclose = (...args) => {
            this.close(...args)
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.onopen = null
            this.ws.onmessage = null
            this.ws.onclose = null
            this.ws.onerror = null
            this.ws.close()
            this.ws = null
        }

        this.firstTime = true
        this.connected = false

        if (this.running) {
            this.running = false
            this.emit('stop')
        }

        if (this.reconnect) {
            clearTimeout(this.reconnect)
            this.reconnect = null
        }

        _.forIn(this.data, (value, key) => {
            delete(this.data[key])
        })
    }

    open() {
        this.emit('open')

        if (this.reconnected) {
            clearTimeout(this.reconnect)
            this.reconnect = null
        }

        _.forIn(this.data, (value, key) => {
            delete(this.data[key])
        })

        this.ws.send(JSON.stringify({
           fps: this.fps,
           readIbt: this.ibt,
           requestParams: this.params,
           requestParamsOnce: this.once
       }))
    }

    close() {
        this.emit('close')

        if (this.running) {
            this.running = false
            this.emit('stop')
        }

        this.reconnect = setTimeout(() => {
            this.connect()
        }, 2000)
    }

    error(err) {
        this.emit('error', err)
    }

    message(event) {
        let data = JSON.parse(event.data.replace(/\bNaN\b/g, 'null'))

        if (data.disconnected) {
            this.running = false
            this.emit('stop')
        }

        if (data.connected) {
            _.forIn(this.data, (value, key) => {
                delete(this.data[key])
            })
        }

        if (data.connected || (this.firstTime && !this.connected)) {
            this.firstTime = false
            this.running = true
            this.emit('start')
        }

        if (data.data) {
            let keys = []
            _.forIn(data.data, (value, key) => {
                this.data[key] = value
                keys.push(key)
            })

            this.emit('update', keys)
        }
    }
}
