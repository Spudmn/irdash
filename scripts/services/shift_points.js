class ShiftPoints {
    constructor() {
        this.ipc  = require('electron').ipcRenderer
        this.load = true
        this.data = {}

        this.get()
    }

    get() {
        if (this.load) {
            this.data = this.ipc.sendSync('getShiftPoints')
            this.load = false
        }

        return this.data
    }

    set(shiftPoints) {
        this.load = true

        return this.ipc.sendSync('setShiftPoints', shiftPoints)
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
