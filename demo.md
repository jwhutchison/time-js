# Demo

* Why
* General concepts
  * A moment in time
    * Parse and display both require TZ every time
    * Except if parsing ISO8601: 2022-10-22T20:00:00.000-07 (or Z)
  * User inputs should be localized
    * Prefer user choice on timezone, but guessing is ok
  * Store UTC
  * UTC over the wire
  * Display localized
* JS
  * Native
  * Existing code: Moment
  * New code:
    * Native, Luxon, date-fns
* PHP
  * Native
  * Existing code: native strtotime() and dateformat()
  * New code: DateTime and DateTimeZone

Absolute timestamp (unix time) => 1625101200
MySQL format (system TZ dependent) => 2022-05-11 11:00:00
ISO8601 format (independent) => 2022-05-11T11:00:00.000Z
