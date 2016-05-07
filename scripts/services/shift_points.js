const ShiftPoints = (() => {
    const ipc = require('electron').ipcRenderer

    let loaded = false

    const load = function() {
        loaded = true
        
        return ipc.sendSync('getShiftPoints')
    }

    const save = function(config) {
        loaded = false

        return ipc.sendSync('setShiftPoints', config)
    }

    class ShiftPoints {
        constructor() {
            this.data = load()
        }

        all() {
            if (!loaded) {
                this.data = load()
            }

            return this.data
        }

        save(config) {
            return save(config)
        }

        forCar(carId) {
            if (!this.data.hasOwnProperty(carId)) {
                return null
            }

            return this.data[carId]
        }

        forCarAndGear(carId, gear) {
            if (!this.data.hasOwnProperty(carId)) {
                return null
            }

            if (!this.data[carId].hasOwnProperty(gear)) {
                return null
            }

            return this.data[carId][gear]
        }
    }

    return ShiftPoints
})()
