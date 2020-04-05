# i18next-wc

Web-components for [i18next][].

Handles formatting of intl messages as well as formatting date and numbers.

Usable as pure web-component as well as with JSX (react...).

The following components are available

- `<intl-message>` to format messages with [i18next][]
- `<intl-datetime>` to format dates with [Intl.DateTimeFormat][]
- `<intl-relative-time>` to format relative dates with [Intl.RelativeTimeFormat][]
- `<intl-number>` to format numbers with [Intl.NumberFormat][]

For inspiration of this project credits go to [kwc-i18next][] 👏.

## Table of contents

<!-- !toc (minlevel=2 omit="Table of contents") -->

* [Installation](#installation)
* [intl-message](#intl-message)
  * [Examples](#examples)
  * [Attributes](#attributes)
* [intl-datetime](#intl-datetime)
  * [Example](#example)
  * [Attributes](#attributes-1)
* [intl-relative-time](#intl-relative-time)
  * [Example](#example-1)
  * [Attributes](#attributes-2)
* [intl-number](#intl-number)
  * [Example](#example-2)
  * [Attributes](#attributes-3)
* [Contributing](#contributing)
* [License](#license)
* [References](#references)

<!-- toc! -->

## Installation

Install both [i18next][] and this package as dependencies

```
npm i i18next-wc i18next
```

## intl-message

Formats messages with [i18next][].

```html
<intl-message key="test:key">
A value

<intl-message key="title" value="Title">
My Title

<intl-message key="deep" value='{"key":"Hello","val":"World"}'>
Hello World!

<intl-message key="html" value="<span style='color: red'>dangerous</span>">
With HTML it might get <span style='color: red'>dangerous</span>

<intl-message key="html" dangerous value="<span style='color: red'>dangerous</span>">
With HTML it might get dangerous

<intl-message key="item" count="1">
One item

<intl-message key="item" count="10">
10 items

<script src="https://unpkg.com/i18next@19/i18next.min.js"></script>
<script src="https://unpkg.com/i18next-wc/dist/intl-message.js"></script>
<script>
  i18next.init({ // initialize i18next
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: {
        default: {
          title: "My {{value}}",   deep: "{{value.key}} {{value.val}}!",
          item: "One item",        item_plural: "{{count}} items",
          html: "With HTML it might get {{value}}"
        },
        test: {
          key: "A value"
        }
      }
    },
    defaultNS: "default",
    fallbackNS: "global"
  })
</script>
```

### Examples

- [_examples/message.html_](examples/message.html)

- [_examples/message-plurals.html_](examples/message-plurals.html) if you like to use a custom i18next post-processor

- [_examples/message-icu.html_](examples/message-icu.html) for using the web-component with [i18next-icu][]

### Attributes

| attribute | type    | description |
| --------- | ------- | ----------- |
| key       | `string`  | i18next key |
| count     | `number`  | count for plurals |
| context   | `string`  | i18next context |
| value     | `string`, `json`, `object` | use value for for default inserts |
| lng       | `string`  | changes default language |
| ns        | `string`, `string[]` | changes default namespace |
| options   | `json`, `object`     | i18next options. See [i18next-options][] |
| dangerous | `boolean` | dangerously insert unescaped content (XSS!) |
| hidden    | `boolean` | hide translation from rendering |

## intl-datetime

```html
<intl-datetime>
05/04/2020

<intl-datetime time>
22:03:47

<intl-datetime weekday="long">
dimanche

<intl-datetime value="2020-03-12" lng="en-GB">
12/03/2020

<intl-datetime value="2020-03-12" lng="en-US">
3/12/2020

<intl-datetime options='{"weekday":"short","year":"numeric","month":"long","day":"numeric"}'>
dim. 5 avril 2020

<intl-datetime date weekday="long" month="long" lng="ja">
2020年4月5日日曜日

<intl-datetime date time hour12 timeZoneName="short">
05/04/2020 à 10:03:47 PM UTC+2

<intl-datetime date time hourCycle="h12" timeZoneName="long" timeZone="Asia/Tokyo">
06/04/2020 à 5:03:47 heure normale du Japon

<intl-datetime date time hour12 timeZoneName="long" timeZone="Asia/Foobar">
05/04/2020

<!-- intl-datetime works also without i18next -->
<script src="https://unpkg.com/i18next@19/i18next.min.js"></script>
<script src="https://unpkg.com/i18next-wc/dist/intl-datetime.js"></script>
```

### Example

See [_examples/datetime.html_](examples/datetime.html).

### Attributes

| attribute              | type      | description |
| ---------------------- | --------- | ----------- |
| lng                    | `string`  | changes default language |
| value                  | `Date`, `ISOString` | if string than use iso format. E.g. local date `2020-12-31 12:00:00` or UTC date `2020-12-31T12:00:00Z`. Use always `new Date().toISOString()` to be on the safe side. If undefined current timestamp is used. |  
| options                | `json`, `object`   | json formatted string of [DateTimeFormatOptions][] |
| weekday                | `string`  | "narrow", "short", "long" |
| era                    | `string`  | "narrow", "short", "long" |
| year                   | `string`  | "2-digit", "numeric" |
| month                  | `string`  | "2-digit", "numeric", "narrow", "short", "long" |
| day                    | `string`  | "2-digit", "numeric" |
| hour                   | `string`  | "2-digit", "numeric" |
| minutes                | `string`  | "2-digit", "numeric" |
| seconds                | `string`  | "2-digit", "numeric" |
| hour12                 | `boolean` | use `AM`, `PM` if `true` |
| hourCycle              | `string`  | "h11", "h12", "h23", "h24" |
| timeZone               | `string`  | timezone of date e.g. "Asia/Tokyo" |
| timeZoneName           | `string`  | "short", "long" |
| localeMatcher          | `string`  | "lookup", *"best fit"* |
| formatMatcher          | `string`  | "basic", *"best fit"* |
| numberingSystem        | `string`  | "arab", "arabext", "bali", "beng", "deva", "fullwide", "gujr", "guru", "hanidec", "khmr", "knda", "laoo", "latn", "limb", "mlym", "mong", "mymr", "orya", "tamldec", "telu", "thai", "tibt" |
| calendar               | `string`  | buddhist", "chinese", "coptic", "ethiopia", "ethiopic", "gregory", "hebrew", "indian", "islamic", "iso8601", "japanese", "persian", "roc" |
| date                   | `boolean` | if set display date |
| time                   | `boolean` | if set display time |

## intl-relative-time

> **⚠ NOTE**: Consider using a [polyfill][Intl.RelativeTimeFormat polyfill] for Safari, Safari iOS and Edge

### Example

See [_examples/relative-time.html_](examples/relative-time.html).

### Attributes

| attribute     | type      | description |
| ------------- | --------- | ----------- |
| lng           | `string`  | changes default language |
| value         | `Date`, `ISOString` | if string than use iso format. E.g. local date `2020-12-31 12:00:00` or UTC date `2020-12-31T12:00:00Z`. Use always `new Date().toISOString()` to be on the safe side |  
| options       | `json`, `object` | json formatted string of [todo][] |
| unit          | `string`  | "year", "quarter", "month", "week", "day", "hour", "minute", *"second"* |
| style         | `string`  | "narrow", "short", "long" |
| numeric       | `string`  | "always", "auto" |
| localeMatcher | `string`  | "lookup", "best fit" |
| update        | `boolean` | automatically update value |

## intl-number

```html
<intl-number value="123456.789">
123.456,789

<intl-number value="123456.789" lng="en-IN">
1,23,456.789

<intl-number value="123456.789" lng="ar-EG">
١٢٣٬٤٥٦٫٧٨٩

<intl-number value="123456.789" lng="zh-Hans-CN-u-nu-hanidec">
一二三,四五六.七八九

<intl-number value="123456.789" lng="de-DE" options='{"style":"currency","currency":"EUR"}'>
123.456,79 €

<intl-number value="123456.789" lng="ja-JP" p-style="currency" currency="JPY">
￥123,457

<intl-number value="123456.789" lng="en-IN" maximumSignificantDigits="3">
1,23,000

<intl-number value="50" lng="pt-PT" p-style="unit" unit="mile-per-hour">
50 mi/h

<intl-number value="12" lng="en-GB" p-style="unit" unit="liter" unitDisplay="long">
12 litres

<intl-number value="987654321" lng="en-US" notation="scientific">
9.877E8

<intl-number value="987654321" lng="pt-PT" notation="scientific">
9,877E8

<intl-number value="987654321" lng="en-GB" notation="engineering">
987.654E6

<intl-number value="987654321" lng="de" notation="engineering">
987,654E6

<intl-number value="987654321" lng="zh-CN" notation="compact">
9.9亿

<intl-number value="987654321" lng="fr" notation="compact">
988 M

<!-- intl-number works also without i18next -->
<script src="https://unpkg.com/i18next@19/i18next.min.js"></script>
<script src="https://unpkg.com/i18next-wc/dist/intl-number.js"></script>
```

### Example

See [_examples/number.html_](examples/number.html).

### Attributes

| attribute                  | type     | description |
| -------------------------- | -------- | ----------- |
| lng                        | `string` | changes default language |
| value                      | `number` | value as number string |  
| options                    | `json` or `object`    | object or json formatted string of [NumberFormatOptions][] |
| styleProp                  | `string` | *"decimal"*, "percent", "currency", "unit" <br> alternatively use `style` within `options` |
| currency                   | `string` | [ISO 4217][] currency and funds code e.g. "EUR", "USD" |
| currencyDisplay            | `string` | "code", *"symbol"*, "narrowSymbol", "name" |
| currencySign               | `string` | *"standard"*, "accounting" |
| unit                       | `string` | See [TC39 IsSanctionedSimpleUnitIdentifier](https://tc39.es/ecma402/#sec-issanctionedsimpleunitidentifier) |
| unitDisplay                | `string` | *"short"*, "narrow", "long" |
| notation                   | `string` | *"standard"*, "scientific", "engineering", "compact" |
| compactDisplay             | `string` | *"short"*, "long" |
| useGrouping                | `boolean`|  |
| signDisplay                | `string` | *"auto"*, "never", "always", "exceptZero" |
| localeMatcher              | `string` | "lookup", *"best fit"* |
| minimumIntegerDigits       | `number` | 1...21 |
| minimumFractionDigits      | `number` | 1...21 |
| maximumFractionDigits      | `number` | 1...21 |
| minimumSignificantDigits   | `number` | 1...21 |
| maximumSignificantDigits   | `number` | 1...21 |
| numberingSystem            | `string` | "arab", "arabext", "bali", "beng", "deva", "fullwide", "gujr", "guru", "hanidec", "khmr", "knda", "laoo", "latn", "limb", "mlym", "mong", "mymr", "orya", "tamldec", "telu", "thai", "tibt" |

## Using with JSX

You can use all components in JSX (react, apprun, ...) as well.

```js
import i18next from "i18next"

// take care of treeshaking - removing the below line may cause that the Wc gets removed by treeshaking
import 'i18next-wc'
import { intlMessage } from 'i18next-wc'

// initialize i18next
i18next.init({
  lng: 'en-GB',
  fallbackLng: "en",
  resources: {
    en: {
      default: {
        placeholder: 'fill in here',
        'Selected language': 'Selected language: {{value}}'
      },
    },
    fr: {
      default: {
        placeholder: 'remplir ici',
        'Selected language': 'Langue choisie : {{value}}'
      }
    }
  },
  defaultNS: 'default'
})

// inject i18next into web-component
const IntlMessage = (props) => (<intl-message { ...{i18next, ...props }} />)

// use in your custom component
export function JsxComponent ({ lng }) {
  return (
    <>
      <IntlMessage key="Selected language" value={lng} />
      <input placeholder={intlMessage({i18next, key: 'placeholder'})} />
    </>
  )
}
```


## Contributing

Feel free to clone the project and submit a PR.
On contributing you implicitly agree to license your code under the terms of the MIT license.

## License

MIT Licensed

## References

<!-- !ref -->

* [DateTimeFormatOptions][DateTimeFormatOptions]
* [i18next][i18next]
* [i18next-icu][i18next-icu]
* [i18next-options][i18next-options]
* [Intl.DateTimeFormat][Intl.DateTimeFormat]
* [Intl.NumberFormat][Intl.NumberFormat]
* [Intl.RelativeTimeFormat][Intl.RelativeTimeFormat]
* [Intl.RelativeTimeFormat polyfill][Intl.RelativeTimeFormat polyfill]
* [ISO 4217][ISO 4217]
* [kwc-i18next][kwc-i18next]
* [NumberFormatOptions][NumberFormatOptions]
* [RelativeTimeFormatOptions][RelativeTimeFormatOptions]

<!-- ref! -->

[kwc-i18next]: https://github.com/successk/kwc-i18next
[i18next]: https://www.i18next.com/
[i18next-options]: https://www.i18next.com/translation-function/essentials#overview-options

[Intl.DateTimeFormat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
[DateTimeFormatOptions]: https://tc39.es/ecma402/#datetimeformat-objects

[Intl.RelativeTimeFormat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat
[RelativeTimeFormatOptions]: https://v8.dev/features/intl-relativetimeformat
[Intl.RelativeTimeFormat polyfill]: https://github.com/wessberg/intl-relative-time-format

[Intl.NumberFormat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
[NumberFormatOptions]: https://tc39.es/ecma402/#table-numberformat-resolvedoptions-properties
[ISO 4217]: https://en.wikipedia.org/wiki/ISO_4217
[i18next-icu]: https://github.com/i18next/i18next-icu
