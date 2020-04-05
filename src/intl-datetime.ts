import { WebComponentElement } from './WebComponentElement'
import { trueish, toDate, toJson, elementText, attributeMap } from './utils'

interface IOptions {
  value?: Date
  lng?: string
  options?: IOptions
  date?: boolean
  time?: boolean
  weekday?: string
  era?: string
  year?: string
  month?: string
  day?: string
  hour?: string
  minute?: string
  second?: string
  hour12?: boolean
  hourCycle?: string
  timeZone?: string
  timeZoneName?: string
  localeMatcher?: string
  formatMatcher?: string
  numberingSystem?: string
  calendar?: string
}

// @see https://www.i18next.com/translation-function/essentials#overview-options
const ATTR = [
  // own attribs
  'value', // the Date local "YYYY-MM-DD [hh:mm:ss]" or UTC "YYYY-MM-DDThh:mm:ssZ"
  'lng',   // change language
  'options', // json formatted string of DateTimeFormatOptions
  'date',  // show date
  'time',  // show time
  // DateTimeFormatOptions
  'weekday',
  'era',
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
  'hour12',
  'hourCycle',
  'timeZone',
  'timeZoneName',
  'localeMatcher',
  'formatMatcher',
  'numberingSystem',
  'calendar'
]

// only lowercase attributes are passed on
// only lowercase attributes are passed on
const attrmap = attributeMap(ATTR)

const DATE = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}

const TIME = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

export class IntlDatetime extends WebComponentElement {
  protected _props: IOptions

  constructor () {
    super()
    this._observedAttributes = ATTR
  }

  static get observedAttributes() {
    return ATTR
  }

  protected _properties (name: string, value: any): void {
    const {_props} = this
    name = attrmap[name] || name
    switch (name) {
      case 'value':
        _props[name] = toDate(value)
        break
      case 'date':
        if (trueish(value)) {
          this._props = Object.assign(_props, DATE)
        }
        break
      case 'time':
        if (trueish(value)) {
          const hour12 = _props.hour12 || false
          this._props = Object.assign(_props, TIME, { hour12 })
        } else {
          const { hour, minute, second, ...other } = _props
          this._props = other
        }
        break
      case 'hour12': {
        _props[name] = trueish(value)
        break
      }
      case 'options':
        this._props = Object.assign(_props, toJson(value))
        break
      default:
        _props[name] = toJson(value, value)
    }
  }

  protected _render (): any {
    if (this._initialized) {
      const { value, lng, ...options } = this._props
      const date = value || new Date()
      const lngs = this._languages(lng)
      try {
        this.textContent = new Intl.DateTimeFormat(lngs, options).format(date)
      } catch (e) {
        // fail safe display without options
        this.textContent = new Intl.DateTimeFormat(lngs).format(date)
        // can't use console.error here as mocha thinks that tests have failed
        console.log(e) // eslint-disable-line no-console
      }
    }
  }
}

customElements.define('intl-datetime', IntlDatetime)

export function intlDatetime (props: object | undefined) {
  return elementText('intl-datetime', props)
}
