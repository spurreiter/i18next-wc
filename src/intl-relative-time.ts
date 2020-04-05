import { WebComponentElement } from './WebComponentElement'
import { toJson, toDate, elementText, attributeMap } from './utils'
import { relativeTime } from './relativeTime'

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

// only lowercase attributes are passed on
const attrmap = attributeMap(ATTR)

export class IntlRelativeTime extends WebComponentElement {
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
        const _value = toDate(value) || value
        this._props = Object.assign(_props, relativeTime(_value, _props.unit))
        break
      case 'options':
        const options = toJson(value)
        if (typeof options === 'object') {
          this._props = Object.assign(_props, options)
        }
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
      const { value = 0, lng, unit = 'second', ...options } = this._props
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
