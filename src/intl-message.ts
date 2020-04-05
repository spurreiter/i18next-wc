import {WebComponentElement} from './WebComponentElement'
import { trueish, toDate, toJson, elementText } from './utils'

interface IOptions {
  i18next?: any
  key?: string
  count?: number
  context?: string
  lng?: string
  ns?: string[] | string
  options?: IOptions
  interpolation?: object
  value?: Date | object | string
  dangerous?: boolean
}

// @see https://www.i18next.com/translation-function/essentials#overview-options
const ATTR = [
  'key',
  'count',
  'context',
  'lng',
  'ns',
  'options',
  // own attribs
  'value',
  'dangerous'
]

export class IntlMessage extends WebComponentElement {
  protected _props: IOptions = {}

  constructor () {
    super()
    this._observedAttributes = ATTR
  }

  static get observedAttributes() {
    return ATTR
  }

  protected _properties (name: string, value: any): void {
    if (name === 'dangerous') {
      this._props.interpolation = { escapeValue: !trueish(value) }
    } else {
      const val = toDate(value) || toJson(value) || value
      if (name === 'options' && typeof val === 'object') {
        this._props = { ...this._props, ...val }
      } else {
        this._props[name] = val
      }
    }
  }

  protected _render (): any {
    if (this._initialized) {
      const { key, ...options } = this._props
      this.innerHTML = this._i18next.t(key, options) || ''
    }
  }
}

customElements.define('intl-message', IntlMessage)

export function intlMessage (props: object = {}) {
  return elementText('intl-message', props)
}
