import { BaseElement } from './BaseElement'
import { toJson, trueish, toNumber, toDate, elementText, attributesToLowerCase } from './utils'
import { relativeTime, nextIntervalMs, lowerUnit, toUnit } from './relativeTime'

interface IOptions {
  i18next?: any
  value?: number
  lng?: string
  options?: IOptions
  unit?: string
  localeMatcher?: string
  style?: string
  numeric?: string
  update?: boolean
  updateUnit?: boolean
  date?: Date
}

// @see https://www.i18next.com/translation-function/essentials#overview-options
const ATTR = [
  // own attribs
  'value', // the Date local "YYYY-MM-DD [hh:mm:ss]" or UTC "YYYY-MM-DDThh:mm:ssZ"
  'lng',   // change language
  'options', // json formatted string of DateTimeFormatOptions
  //
  'unit',
  'localeMatcher',
  'styleProp', // gets resolved to style
  'numeric',
  'update'
]

export class IntlRelativeTime extends BaseElement {
  protected _props: IOptions
  private _timerId: any

  static get observedAttributes() {
    return attributesToLowerCase(ATTR)
  }

  constructor () {
    super(ATTR)
  }

  disconnectedCallback () {
    clearTimeout(this._timerId)
    super.disconnectedCallback()
  }

  private _setTimer ()  {
    const { date, value, unit } = this._props
    const timeout = nextIntervalMs({ date, unit })
    this._timerId = setTimeout(() => {
      this._timerId = null
      const change = lowerUnit(relativeTime(date, unit))
      if (change.value !== value) {
        this._props.value = change.value
        this._properties('unit', change.unit)
        this._render()
      } else if (this._props.update) {
        this._setTimer()
      }
    }, timeout)
  }

  protected _properties (name: string, value: any): void {
    const {_props} = this

    switch (name) {
      case 'value':
        const _valueOrDate = toDate(value) || toNumber(value) || 0
        this._props = Object.assign(_props, relativeTime(_valueOrDate, _props.unit))
        break
      case 'options':
        const options = toJson(value)
        if (typeof options === 'object') {
          this._props = Object.assign(_props, options)
        }
        break
      case 'update':
        const isActive = _props[name] = trueish(value)
        if (!isActive) clearTimeout(this._timerId)
        break
      case 'styleProp':
        if (typeof value === 'string') _props.style = value
        break
      case 'unit':
        _props[name] = toUnit(value)
        break
      default:
        _props[name] = toJson(value, value)
    }
  }

  protected _render (): any {
    if (this._initialized) {
      const { value = 0, lng, unit = 'second', date, update, ...options } = this._props
      if (update && !this._timerId) this._setTimer()
      const lngs = this._languages(lng)
      try {
        // @ts-ignore - ts does not know Intl.RelativeTimeFormat yet
        this.textContent = new Intl.RelativeTimeFormat(lngs, options).format(value, unit)
      } catch (e) {
        // fail safe display without options
        // @ts-ignore
        this.textContent = new Intl.RelativeTimeFormat(lngs).format(value, unit)
        // can't use console.error here as mocha thinks that tests have failed
        console.log(e) // eslint-disable-line no-console
      }
    }
  }
}

customElements.define('intl-relative-time', IntlRelativeTime)

export function intlRelativeTime (props: IOptions | undefined) {
  const { update, ..._props } = props
  return elementText('intl-relative-time', _props)
}
