# time-js

Compares relative ease of use for parsing, timezoning, formatting, and manipulating datetimes with
various libraries.

* Native JS
* moment.js
* Luxon
* date-fns-tz

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
