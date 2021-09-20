# time-js

Compares relative ease of use for parsing, timezoning, formatting, and manipulating datetimes with
various libraries.

* Native JS
* moment.js
* Luxon
* date-fns-tz
* Day.js

```bash
yarn install
yarn start
```

## My Thoughts

Native JS is actually pretty flexible for 90% of use cases. As long as your needs for formatting
dates are close to of the localized styles, there are a number of options for how to actually format the
various parts. Custom formats are possible by grabbing and rearranging the parts, perhaps through a
utility helper. That said, the syntax is pretty cumbersome.

Luxon is pretty great. It uses Native under the hood and parsing/formatting/converting is all super
easy. It covers all use cases for moment.js and is likely the best choice _if_ the project has a need
for more than just native. Size is pretty reasonable (70k). Syntax is OO and very natural feeling.

date-fns-tz is a weird one. It works with native date objects, which is great, but does not have input
parsing helpers. Output formatting is very flexible. There are an absolute ton of helpers for every
possible situation (eg, formatDistance, eachHourOfInterval, areIntervalsOverlapping, isFuture).
However, its functional nature means that you have to import both `date-fns` and `date-fns-tz`,
import each helper you intend to use, and there is no prebuilt package for standard web use; it must
be packaged in your app. Full size is about 70k, but because it's functional, it's very shakable.

## Overview

### Moment.js

A legacy project, now in maintenance mode. In most cases, a different solution should be chosen.

> One day soon, we hope there won't be a strong need for date and time libraries in JavaScript at all. Instead, we will be able to use capabilities of the JavaScript language itself. Though some capabilities are here today, we know from experience and data that there is significant room for improvement.
>
> `Temporal` will be a new global object that acts as a top-level namespace (like `Math`). It exposes many separate types of objects including `Temporal.Instant`, `Temporal.ZonedDateTime`, `Temporal.PlainDate` and several others.

We now generally consider Moment to be a legacy project in maintenance mode. It is not dead, but it is indeed done.

### Luxon

A powerful, modern, and friendly wrapper for JavaScript dates and times.

```js
// Now
DateTime.now();

// Parse From ISO
DateTime.fromISO('2021-07-01T01:00:00.000Z');

// Parse From MySQL
DateTime.fromSQL('2021-07-01 01:00:00');

// Query
var d1 = DateTime.fromISO('2017-04-30');
var d2 = DateTime.fromISO('2017-04-01');

d2 < d1;

// Display
DateTime.now().toLocaleString(DateTime.DATE_FULL);

// Manipulate + Relative Date
DateTime.now().minus({ days: 2 }).toRelative();

// Time Zone Support
DateTime.fromISO('2014-06-25T10:00:00').setZone('America/New_York').toISO();
```

### Date Functions

**date-fns** provides the most comprehensive, yet simple and consistent toolset
for manipulating JavaScript dates in a browser & Node.js — _it's like Lodash for dates!_

```js
// Now
format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));

// Parse From ISO
parseISO('2021-07-01T01:00:00.000Z');

// Parse From MySQL
format('2021-07-01 01:00:00', 'YYYY-MM-DD HH-mm-ss');

// Display
format(new Date(), 'LLLL d, yyyy');

// Query
isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11));

// Manipulate + Relative Date
formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });

// Time Zone Support
zonedTimeToUtc('2014-06-25T10:00:00', 'America/New_York').toISOString();
```

### Day.js

Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API. _If you use Moment.js, you already know how to use Day.js!_

```js
// Now
dayjs();

// Parse From ISO
dayjs('2021-07-01T01:00:00.000Z');

// Parse From MySQL
dayjs.extend(customParseFormat);

dayjs('2021-07-01 01:00:00', 'YYYY-MM-DD HH:mm:ss');

// Display
dayjs().format('MMMM D, YYYY')

// Query
dayjs().isBefore(dayjs('2021-07-01'));

// Manipulate + Relative Date
dayjs().subtract({ days: 2 }).fromNow();

// Time Zone Support
dayjs('2014-06-25T10:00').tz('America/New_York').format();
```

## Comparison

| Project        | Unpacked | Transfer | GitHub Stars | Weekly Downloads | Version           |
| -------------- | -------- | -------- | ------------ | ---------------- | ----------------- |
| [Moment.js][1] | 4.21 MB  | !!!      | 46k          | 15.2M            | 2.29.1 (Oct 2020) |
| [Luxon][2]     | 3.65 MB  | 20 KB    | 11.6k        | 1.8M             | 2.0.2 (Aug 2021)  |
| [Date-FNS][3]  | 6.33 MB  | 18 KB    | 26.9k        | 10.9M            | 2.24.0 (Sep 2021) |
| [Day.js][4]    | 623 KB   | 2 KB     | 36.3k        | 6.4M             | 1.10.7 (Sep 2021) |

[0]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[1]: https://www.npmjs.com/package/moment
[2]: https://www.npmjs.com/package/luxon
[3]: https://www.npmjs.com/package/date-fns
[4]: https://www.npmjs.com/package/dayjs
