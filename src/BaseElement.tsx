import { IFnVoid } from './types'

const EVENTS = ['initialized', 'loaded', 'languageChanged']

export class BaseElement extends HTMLElement {
  private _off: IFnVoid[]
  protected _initialized: boolean = false
  protected _props: object = {}
  protected _observedAttributes: string[] = []
  protected _i18next: any
  private _attrMap: (arg0: string) => string

  set i18next (i18next :any) {
    if (this._i18next !== i18next) {
      this._disconnect()
      this._i18next = i18next
      this._connect()
    }
  }

  static get observedAttributes () {
    return []
  }

  constructor () {
    super()
    this._i18next = (window as any).i18next
    const ctor = (this.constructor as typeof BaseElement)
    const attrMap = ctor.observedAttributes.reduce((map, name) => {
      const lc = name.toLowerCase()
      if (lc !== name) {
        map[lc] = name
      }
      return map
    }, {})
    this._attrMap = (name: string) : string => attrMap[name] || name
  }

  connectedCallback () {
    this._assignProps()
    this._disconnect() // try not to attach more than one event handler
    this._connect()
    this._initialized = true
    this._render()
  }

  disconnectedCallback () {
    this._disconnect()
  }

  attributeChangedCallback (name: string, oldValue: unknown, value: unknown) {
    if (oldValue !== value) {
      // camelCase attributes arrive only as lowercase
      this._properties(this._attrMap(name), value)
      window.requestAnimationFrame(() => {
        this._render()
      })
    }
  }

  private _assignProps () {
    Array.from(this.attributes).forEach(item => this._properties(this._attrMap(item.name), item.value))

    const ctor = (this.constructor as typeof BaseElement)
    ctor.observedAttributes.forEach(name => {
      if (this[name] !== undefined) this._properties(name, this[name])

      Object.defineProperty(this, name, {
        get (): any {
          return this._props[name]
        },
        set (this: BaseElement, value: unknown) {
          this.attributeChangedCallback(name, this._props[name], value)
        },
        configurable: true,
        enumerable: true
      })
    })
  }

  private _connect () {
    if (this._i18next) {
      this._off = EVENTS.map(evName => {
        const fn = () => {
          window.requestAnimationFrame(() => {
            this._assignProps() // reassure that props are assigned after a remount
            this._render()
          })
        }
        this._i18next.on(evName, fn)
        return () => this._i18next.off(evName, fn)
      })
    }
  }

  private _disconnect () {
    this._off && this._off.forEach(fn => fn())
  }

  protected _languages (lng: string | undefined) {
    const lngs = (this._i18next && this._i18next.languages) || (navigator as any).languages
    return [].concat(lng, lngs).filter(Boolean)
  }

  protected _properties (name: string, value: unknown) {
    // Needs implementation
  }

  protected _render () {
    // Needs implementation
  }
}
