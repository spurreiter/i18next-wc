export const trueish = (val: unknown) : boolean => val === '' || !!val

export const isDate = (date?: any) : boolean => date instanceof Date && !isNaN(date.getTime())

const RE_DATE = /^\d{4}-\d{2}-\d{2}/

export const toDate = (val: any) : Date | undefined => {
  if (isDate(val)) {
    return val
  } else if (typeof val === 'string') {
    const date = new Date(val)
    if (RE_DATE.test(String(val)) && isDate(date)) return date
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

export const toNumber = (val: any) => {
  const n = Number(val)
  if (!isNaN(n)) return n
}

export const elementText = (tag: string, props: object | undefined) => {
  const el = document.createElement(tag)
  Object.entries(props).forEach(([name, value]) => { el[name] = value })
  // @ts-ignore
  el.connectedCallback()
  return el.textContent
}

export const attributesToLowerCase = (attrs: string[]) => attrs.map(attr => attr.toLowerCase())
