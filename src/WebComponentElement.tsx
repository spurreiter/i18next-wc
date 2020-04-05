import { IFnVoid } from './types'

const EVENTS = ['initialized', 'loaded', 'languageChanged']

export class WebComponentElement extends HTMLElement {
  private _off: IFnVoid[]
  protected _initialized: boolean = false
  protected _props: object = {}
  protected _observedAttributes: string[] = []
  protected _i18next: any

  set i18next (i18next :any) {
    if (this._i18next !== i18next) {
      this._disconnect()
      this._i18next = i18next
      this._connect()
    }
  }

  constructor () {
    super()
    this._i18next = (window as any).i18next
  }

  connectedCallback () {
    this._assignProps()
    this._connect()
    this._initialized = true
    this._render()
  }

  disconnectedCallback () {
    this._disconnect()
  }

  attributeChangedCallback (name: string, oldValue: unknown, value: unknown) {
    if (oldValue !== value) {
      this._properties(name, value)
      window.requestAnimationFrame(() => {
        this._render()
      })
    }
  }

  private _assignProps () {
    Array.from(this.attributes).forEach(item => this._properties(item.name, item.value))

    this._observedAttributes.forEach(name => {
      if (this[name] !== undefined) this._properties(name, this[name])

      Object.defineProperty(this, name, {
        get (): any {
          return this._props[name]
        },
        set (this: WebComponentElement, value: unknown) {
          this.attributeChangedCallback(name, this._props[name], value)
        },
        configurable: true,
        enumerable: true
      })
    })
  }

  private _connect () {
    if(this._i18next) {
      this._off = EVENTS.map(evName => {
        const fn = () => {
          this._assignProps() // reassure that props are assigned also after a remount
          this._render()
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
