import { WebComponentElement } from './WebComponentElement'
import { toJson, elementText, attributeMap } from './utils'

interface IOptions {
  i18next?: any
  value?: number
  lng?: string
  options?: IOptions
  style?: string
  currency?: string
  currencyDisplay?: string
  currencySign?: string
  unit?: string
  unitDisplay?: string
  notation?: string
  compactDisplay?: string
  useGrouping?: boolean
  signDisplay?: string
  localeMatcher?: string
  minimumIntegerDigits?: number
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  minimumSignificantDigits?: number
  maximumSignificantDigits?: number
  numberingSystem?: string
}

// @see https://www.i18next.com/translation-function/essentials#overview-options
const ATTR = [
  // own attribs
  'value', // the Date local "YYYY-MM-DD [hh:mm:ss]" or UTC "YYYY-MM-DDThh:mm:ssZ"
  'lng',   // change language
  'options', // json formatted string of DateTimeFormatOptions
  // NumberFormatOptions
  'styleProp',
  'currency',
  'currencyDisplay',
  'currencySign',
  'unit',
  'unitDisplay',
  'notation',
  'compactDisplay',
  'useGrouping',
  'signDisplay',
  'localeMatcher',
  'minimumIntegerDigits',
  'minimumFractionDigits',
  'maximumFractionDigits',
  'minimumSignificantDigits',
  'maximumSignificantDigits',
  'numberingSystem'
]

// only lowercase attributes are passed on
const attrmap = attributeMap(ATTR)

export class IntlNumber extends WebComponentElement {
  protected _props: IOptions

  constructor () {
    super()
    this._props.value = 0
    this._observedAttributes = ATTR
  }

  static get observedAttributes() {
    return ATTR
  }

  protected _properties (name: string, value: any): void {
    const {_props} = this
    name = attrmap[name] || name
    switch (name) {
      case 'options':
        this._props = Object.assign(_props, toJson(value))
        break
      case 'style':
        if (typeof value === 'string') _props[name] = value
        break
      default:
        _props[name] = toJson(value, value)
    }
  }

  protected _render (): any {
    if (this._initialized) {
      const { value, lng, ...options } = this._props
      const lngs = this._languages(lng)
      try {
        this.textContent = new Intl.NumberFormat(lngs, options).format(value)
      } catch (e) {
        // fail safe display without options
        this.textContent = new Intl.NumberFormat(lngs).format(value)
        // can't use console.error here as mocha thinks that tests have failed
        console.log(e) // eslint-disable-line no-console
      }
    }
  }
}

customElements.define('intl-number', IntlNumber)

export function intlNumber (props: object | undefined) {
  return elementText('intl-number', props)
}
