export const trueish = (val: unknown) : boolean => val === '' || !!val

const RE_DATE = /^\d{4}-\d{2}-\d{2}/

export const toDate = (val: any) : Date | undefined => {
  if (val instanceof Date) {
    return val
  } else if (typeof val === 'string') {
    const date = new Date(val)
    if (RE_DATE.test(String(val)) && !isNaN(date.getTime())) return date
  }
}

export const toJson = (val: any, def?: any) : any => {
  if (typeof val === 'string') {
    try {
      return JSON.parse(val)
    } catch (e) {}
  }
  return def
}

export const elementText = (tag: string, props: object | undefined) => {
  const el = document.createElement(tag)
  Object.entries(props).forEach(([name, value]) => { el[name] = value })
  // @ts-ignore
  el.connectedCallback()
  return el.textContent
}

const capitalize = ([first, ...rest]) => first.toUpperCase + rest

export const attributeMap = (attrs: string[], setup = {}) => attrs.reduce((o, attr) => {
  const lc = attr.toLowerCase()
  if (attr !== lc) {
    o[lc] = attr
  } else if (lc.indexOf('p-') === 0) {
    const short = attr.substring(2)
    // @ts-ignore
    const pType = 'p' + capitalize(short)
    o[pType] = o[lc] = short
  }
  return o
}, setup)
