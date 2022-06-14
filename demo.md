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
