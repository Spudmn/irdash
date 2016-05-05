{
    /*
     * EngineWarnings
     */
    const EngineWarnings = {
        WATER_TEMP_WARNING: 0x01,
        FUEL_PRESSURE_WARNING: 0x02,
        OIL_PRESSURE_WARNING: 0x04,
        ENGINE_STALLED: 0x08,
        PIT_SPEED_LIMITER: 0x10,
        REV_LIMITER_ACTIVE: 0x20
    }

    /*
     * Flags
     */

    // global flags
    const Flags = {
        CHECKERED: 0x0001,
        WHITE: 0x0002,
        GREEN: 0x0004,
        YELLOW: 0x0008,
        RED: 0x0010,
        BLUE: 0x0020,
        DEBRIS: 0x0040,
        CROSSED: 0x0080,
        YELLOW_WAVING: 0x0100,
        ONE_LAP_TO_GREEN: 0x0200,
        GREEN_HELD: 0x0400,
        TEN_TO_GO: 0x0800,
        FIVE_TO_GO: 0x1000,
        RANDOM_WAVING: 0x2000,
        CAUTION: 0x4000,
        CAUTION_WAVING: 0x8000,

        // drivers black flags
        BLACK: 0x010000,
        DISQUALIFY: 0x020000,
        SERVICIBLE: 0x040000, // car is allowed service (not a flag)
        FURLED: 0x080000,
        REPAIR: 0x100000
    }

    // start lights
    const StartLights = {
        START_HIDDEN: 0x10000000,
        START_READY: 0x20000000,
        START_SET: 0x40000000,
        START_GO: 0x80000000
    }

    /*
     * TrackLocation
     */
    const TrackLocation = {
        NOT_IN_WORLD: -1,
        OFF_TRACK: 0,
        IN_PIT_STALL: 1,
        APROACHING_PITS: 2,
        ON_TRACK: 3
    }

    /*
     * SessionStates
     */
    const SessionStates = {
        INVALID: 0,
        GET_IN_CAR: 1,
        WARMUP: 2,
        PARADE_LAPS: 3,
        RACING: 4,
        CHECKERED: 5,
        COOL_DOWN: 6
    }

    angular.module('ir.constants', [])
        .constant('EngineWarnings', EngineWarnings)
        .constant('Flags', Flags)
        .constant('StartLights', StartLights)
        .constant('TrackLocation', TrackLocation)
        .constant('SessionStates', SessionStates)
}
