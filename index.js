const consola = require('consola');

// Simple test assert with a message
function assert(message, condition, stack = false) {
	if (condition) {
        consola.success(message);
    } else {
		consola.error(`Assertion failed: ${message}`);
        if (stack) {
            consola.error(`Stack: ${new Error().stack}`);
            process.exit(1);
        }
	}
}

// convert MySQL date to ISO-8601 date
function mysqlToISO(date) {
    // Our MySQL date format is: YYYY-MM-DD HH:MM:SS, so we can just add the T and Z and it will be ISO
    return date.replace(/\s+/g, 'T') + '.000Z';
    // Note, it's also possible to directly break the MySQL string into numeric parts and use new Date(Date.UTC())
}

function section(title) {
    consola.log(`\n==> ${title} 🚀\n`);
}

// Constants
const MySQL_Date = '2021-06-30 01:00:00';
const ISO8601_Date = mysqlToISO(MySQL_Date);
const timeZone = 'America/Phoenix';

consola.info('Working with dates:', {
    MySQL_Date,
    ISO8601_Date,
    target: timeZone,
});

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

section('Using Native JS Date');

const jsDate = new Date(ISO8601_Date);
const locale = 'en-US';

consola.info('Parsed:', {
    jsDate,
    ISO: jsDate.toISOString(),
});

assert(
    'Parsed ISO date should match input ISO date',
    jsDate.toISOString() === ISO8601_Date,
);
assert(
    `Default date format in ${timeZone} should be correct`,
    jsDate.toLocaleString('en-US', { timeZone }) === '6/29/2021, 6:00:00 PM',
);

// Intl.DateTimeFormat should be interchangable with the Date.toLocaleString(), but Intl.DateTimeFormat is reusable
consola.info(`Formatting examples for ${locale}:`, {
    'default datetime': jsDate.toLocaleString(locale, { timeZone }),
    'default date': jsDate.toLocaleDateString(locale, { timeZone }),
    'default parts': new Intl.DateTimeFormat(locale, { timeZone }).formatToParts(jsDate),
    'dateStyle full': new Intl.DateTimeFormat(locale, { timeZone, dateStyle: 'full' }).format(jsDate),
    'dateStyle long': jsDate.toLocaleDateString(locale, { timeZone, dateStyle: 'long' }),
    'dateStyle medium': jsDate.toLocaleDateString(locale, { timeZone, dateStyle: 'medium' }),
    'dateStyle short': jsDate.toLocaleDateString(locale, { timeZone, dateStyle: 'short' }),
    'timeStyle full': new Intl.DateTimeFormat(locale, { timeZone, dateStyle: 'short', timeStyle: 'full' }).format(jsDate),
    'timeStyle long': jsDate.toLocaleString(locale, { timeZone, dateStyle: 'short', timeStyle: 'long' }),
    'timeStyle medium': jsDate.toLocaleString(locale, { timeZone, dateStyle: 'short', timeStyle: 'medium' }),
    'timeStyle short': jsDate.toLocaleString(locale, { timeZone, dateStyle: 'short', timeStyle: 'short' }),
});

// Order of parts is determined by the locale, but we can choose format of the parts
consola.info(`Formatting examples for en-GB:`, {
    'default datetime': jsDate.toLocaleString('en-GB', { timeZone }),
    'default date': jsDate.toLocaleDateString('en-GB', { timeZone }),
});

// Relative dates, first make a copy of the original, as dates are mutable
const jsDate30Days = new Date(+jsDate); // equivalent to new Date(Number(jsDate));
// OR const jsDateCopy = new Date(jsDate.valueOf());
// OR const jsDateCopy = new Date(jsDate); // may not work everywhere

// Add 30 days to the date (the get/set pairs work for any portion)
jsDate30Days.setDate(jsDate30Days.getDate() + 30);

assert(
    'Relative date is after (larger than) original date',
    jsDate30Days > jsDate,
);

consola.info('Relative dates:', {
    jsDate30Days,
    'after now?': jsDate30Days > Date.now(),
});

// Using Moment.js


