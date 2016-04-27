/*
 * EngineWarnings
 */
const WATER_TEMP_WARNING = 0x01
const FUEL_PRESSURE_WARNING = 0x02
const OIL_PRESSURE_WARNING = 0x04
const ENGINE_STALLED = 0x08
const PIT_SPEED_LIMITER = 0x10
const REV_LIMITER_ACTIVE = 0x20

/*
 * Flags
 */

// global flags
const CHECKERED = 0x0001
const WHITE = 0x0002
const GREEN = 0x0004
const YELLOW = 0x0008
const RED = 0x0010
const BLUE = 0x0020
const DEBRIS = 0x0040
const CROSSED = 0x0080
const YELLOW_WAVING = 0x0100
const ONE_LAP_TO_GREEN = 0x0200
const GREEN_HELD = 0x0400
const TEN_TO_GO = 0x0800
const FIVE_TO_GO = 0x1000
const RANDOM_WAVING = 0x2000
const CAUTION = 0x4000
const CAUTION_WAVING = 0x8000

// drivers black flags
const BLACK = 0x010000
const DISQUALIFY = 0x020000
const SERVICIBLE = 0x040000 // car is allowed service (not a flag)
const FURLED = 0x080000
const REPAIR = 0x100000

// start lights
const START_HIDDEN = 0x10000000
const START_READY = 0x20000000
const START_SET = 0x40000000
const START_GO = 0x80000000

/*
 * TrackLocation
 */
const NOT_IN_WORLD = -1
const OFF_TRACK = 0
const IN_PIT_STALL = 1
const APROACHING_PITS = 2
const ON_TRACK = 3

/*
 * SessionStates
 */
const SESSION_STATE_INVALID = 0
const SESSION_STATE_GET_IN_CAR = 1
const SESSION_STATE_WARMUP = 2
const SESSION_STATE_PARADE_LAPS = 3
const SESSION_STATE_RACING = 4
const SESSION_STATE_CHECKERED = 5
const SESSION_STATE_COOL_DOWN = 6
