const { format, utcToZonedTime, zonedTimeToUtc } = require('date-fns-tz');
const { add, formatDistance, formatRelative } = require('date-fns');
const { DateTime, Duration, Settings } = require('luxon')
const moment = require('moment-timezone');

// convert MySQL date to ISO-8601 date
function mysqlToISO(date) {
    // Our MySQL date format is: YYYY-MM-DD HH:MM:SS, so we can just add the T and Z and it will be ISO
    return date.replace(/\s+/g, 'T') + '.000Z';
    // Note, it's also possible to directly break the MySQL string into numeric parts and use new Date(Date.UTC())
}

// Constants
const MySQL_Date = '2021-07-01 01:00:00';
const ISO8601_Date = mysqlToISO(MySQL_Date); //??
const timeZone = 'America/Phoenix';

/**
 * Using Native JS Date
 * With some finagling of the output, it should be possible to match most formats
 * Note that Date.toLocaleString() and Date.toLocaleDateString() are convenience methods for Intl.DateTimeFormat.format()
 * See: https://devhints.io/wip/intl-datetime
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * Format options: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
    {
        dateStyle: 'full' | 'long' | 'medium' | 'short',
        timeStyle: 'full' | 'long' | 'medium' | 'short',
        weekday: 'narrow' | 'short' | 'long',
        era: 'narrow' | 'short' | 'long',
        year: 'numeric' | '2-digit',
        month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
        day: 'numeric' | '2-digit',
        hour: 'numeric' | '2-digit',
        minute: 'numeric' | '2-digit',
        second: 'numeric' | '2-digit',
        timeZoneName: 'short' | 'long',

        // Time zone to express it in
        timeZone: 'Asia/Shanghai',
        // Force 12-hour or 24-hour
        hour12: true | false,

        // Rarely-used options
        hourCycle: 'h11' | 'h12' | 'h23' | 'h24',
        formatMatcher: 'basic' | 'best fit'
    }
 */

console.log('==> Native JS Date');

const jsDate = new Date(ISO8601_Date);
const locale = 'en-US';

console.log(jsDate);
console.log(jsDate.toISOString());

// US
console.log(jsDate.toLocaleString(locale, { timeZone }));

// Intl.DateTimeFormat should be interchangable with the Date.toLocaleString(), but Intl.DateTimeFormat is reusable
// Formatting examples for locale
console.log('default datetime', jsDate.toLocaleString(locale, { timeZone }));
console.log('default date', jsDate.toLocaleDateString(locale, { timeZone }));
console.log('default parts', new Intl.DateTimeFormat(locale, { timeZone }).formatToParts(jsDate));
console.log('dateStyle full', new Intl.DateTimeFormat(locale, { timeZone, dateStyle: 'full' }).format(jsDate));
console.log('dateStyle long', jsDate.toLocaleDateString(locale, { timeZone, dateStyle: 'long' }));
console.log('dateStyle medium', jsDate.toLocaleDateString(locale, { timeZone, dateStyle: 'medium' }));
console.log('dateStyle short', jsDate.toLocaleDateString(locale, { timeZone, dateStyle: 'short' }));
console.log('timeStyle full', new Intl.DateTimeFormat(locale, { timeZone, dateStyle: 'short', timeStyle: 'full' }).format(jsDate));
console.log('timeStyle long', jsDate.toLocaleString(locale, { timeZone, dateStyle: 'short', timeStyle: 'long' }));
console.log('timeStyle medium', jsDate.toLocaleString(locale, { timeZone, dateStyle: 'short', timeStyle: 'medium' }));
console.log('timeStyle short', jsDate.toLocaleString(locale, { timeZone, dateStyle: 'short', timeStyle: 'short' }));

// GB
console.log(jsDate.toLocaleString('en-GB', { timeZone }));
console.log(jsDate.toLocaleDateString('en-GB', { timeZone }));

// Relative dates, first make a copy of the original, as dates are mutable
const jsDate30Days = new Date(+jsDate); // equivalent to new Date(Number(jsDate));
// Add 30 days to the date (the get/set pairs work for any portion)
jsDate30Days.setDate(jsDate30Days.getDate() + 30);

console.log('+30 days', jsDate30Days);
console.log('after now?', jsDate30Days > Date.now());

/**
 * Using Moment.js
 * For comparison only
 */

console.log('==> Moment.js');

const momentDate = moment(ISO8601_Date);

console.log(momentDate);
console.log(momentDate.toISOString());
console.log(momentDate.tz(timeZone).format());

console.log('default datetime', momentDate.tz(timeZone).format());
console.log('dddd, MMMM Do YYYY, h:mm:ss a', momentDate.tz(timeZone).format('dddd, MMMM Do YYYY, h:mm:ss a'));
console.log('LLL', momentDate.tz(timeZone).format('LLL'));

/**
 * Using Luxon
 */

console.log('==> Luxon');

Settings.defaultZone = 'UTC';
Settings.defaultLocale = 'en-US';

const luxonDate = DateTime.fromISO(ISO8601_Date);
const luxonDateZoned = luxonDate.setZone(timeZone);

console.log(luxonDate);
console.log(luxonDate.toString());

// Luxon caveat, .equals() is only true if the zone is also the same
// luxonDate.equals(DateTime.fromISO(ISO8601_Date)), ==> false
console.log(+luxonDate === +(DateTime.fromISO(ISO8601_Date)));
// Luxon can parse from formats other than ISO8601
console.log(DateTime.fromFormat(MySQL_Date, 'yyyy-MM-dd HH:mm:ss', { zone: 'UTC' }));
console.log(luxonDateZoned.toFormat('yyyy-MM-dd HH:mm:ss') === '2021-06-30 18:00:00');

console.log('dddd, MMMM Do YYYY, h:mm:ss a', luxonDateZoned.toFormat('dddd, MMMM Do YYYY, h:mm:ss a'));
console.log('LLL d, yyyy', luxonDateZoned.toFormat('LLL d, yyyy'));

// Relative dates
const duration30Days = Duration.fromObject({ days: 30 });
const luxonDate30Days = luxonDate.plus(duration30Days);
// OR
// const luxonDate30Days = luxonDate.plus({ days: 30 });

console.log('+30 days', luxonDate30Days.toFormat('yyyy-MM-dd HH:mm:ss'));
console.log('duration30Days in hours', duration30Days.as('hours'));
console.log('after now?', luxonDate30Days > Date.now());

/**
 * Using date-fns
 */

console.log('==> date-fns');

const fnsDate = new Date(ISO8601_Date); // date-fns uses native Date objects
const fnsDateZoned = utcToZonedTime(fnsDate, timeZone);

console.log(fnsDate);
console.log(fnsDate.toISOString());

console.log(format(fnsDateZoned, 'yyyy-MM-dd HH:mm:ss') === '2021-06-30 18:00:00');

console.log('d.M.yyyy HH:mm:ss.SSS GMT XXX (z)', format(fnsDateZoned, 'd.M.yyyy HH:mm:ss.SSS GMT XXX (z)'));
console.log('LLL d, yyyy', format(fnsDateZoned, 'LLL d, yyyy'));

// Relative dates
const fnsDate30Days = add(fnsDate, { days: 30 });

console.log('+30 days', format(fnsDate30Days, 'LLL d, yyyy'));
console.log('relative', formatRelative(fnsDate30Days, fnsDate30Days));
console.log('duration', formatDistance(fnsDate30Days, fnsDate));
