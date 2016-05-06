class Helpers {
    constructor() {
    }

    /* static */ formatLapTime(time) {
        if (null == time || 0 >= time) {
            return '--'
        }

        let min = parseInt(time / 60),
            sec = parseInt(time) - min * 60,
            ms = parseInt(_.split(time.toFixed(min < 10 ? 3 : 2), '.')[1])

        return min + ':' + this.leftPad(sec, 2) + '.' + this.leftPad(ms, 3)
    }

    /* static */ leftPad(str, pad) {
        return _.padStart(str, pad, 0)
    }

    /* static */ numRevs(redLine) {
        return _.range(0, _.ceil(redLine / 1000))
    }

    /* static */ highestRev(revs) {
        return (_.last(revs) + 1) * 1000
    }
}
