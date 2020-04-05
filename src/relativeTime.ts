
import {toNumber} from './utils'

interface IValueUnit {
  value: number
  unit: string
  date?: Date
}

const isDate = (value: any): boolean =>
  value && (value instanceof Date) && !isNaN(value.getTime())

const UNITS = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second']

const LOWER = [12, 4, 7, 24, 60, 60]

const INTERVAL_DAY = 86400

const INTERVALS = {
  year: 365 * INTERVAL_DAY,
  quarter: 4 * 30 * INTERVAL_DAY,
  month: 30 * INTERVAL_DAY,
  week: 7 * INTERVAL_DAY,
  day: INTERVAL_DAY,
  hour: 3600,
  minute: 60
}

export const toUnit = (unit?: string) => {
  unit = String(unit).replace(/s$/, '')
  return UNITS.indexOf(unit) !== -1 ? unit : 'second'
}

export const weekDiff = (diff: any, now: Date) : number => {
  const dayOfWeek = now.getDay()
  const { day } = diff
  const realdays = day < 0 ? day + dayOfWeek - 7 : day - dayOfWeek + 7
  const realweeks = day < 0 ? Math.ceil(realdays / 7) : Math.floor(realdays / 7)
  return realweeks
}

const inUnit = (end: Date, start: Date, divider: number = 1) =>
  Math.trunc((end.getTime() - start.getTime()) / 1000 / divider )

const inMonths = (end: Date, start: Date, days: number) : number => {
  if (Math.abs(days) < 31) return 0
  return Math.trunc(end.getMonth() + 12 * end.getFullYear() - (start.getMonth() + 12 * start.getFullYear()))
}

export const relativeTime = (date?: Date | number, unit?: string) : IValueUnit => {
  if (isDate(date)) {
    date = date as Date
    const now = new Date()
    const day = inUnit(date as Date, now, INTERVALS.day)
    const month = inMonths(date as Date, now, day)

    const diff = {
      year: Math.trunc(month / 12),
      month,
      week: inUnit(date, now, INTERVALS.week),
      day,
      hour: inUnit(date, now, INTERVALS.hour),
      minute: inUnit(date, now, INTERVALS.minute),
      second: inUnit(date, now)
    }
    for (let i = 0; i < UNITS.length; i++) {
      const unit = UNITS[i]
      let value = diff[unit]
      if (value !== 0) {
        if (unit === 'week') {
          value = weekDiff(diff, now)
        }
        // console.log(date.toISOString(), diff, value, unit)
        return { value, unit, date }
      }
    }
    return { value: 0, unit: 'second', date: new Date() }
  } else {
    const ms = nextIntervalMs({ unit }, true) * (date as number) + Date.now()
    return { value: toNumber(date), unit, date: new Date(ms) }
  }
}

export const nextIntervalMs = ({date = new Date(), unit}, exact?: boolean) : number => {
  const interval = (INTERVALS[unit] || 1)
  const delta = inUnit(date, new Date())
  let diff = ((interval + delta) % interval) || interval
  if (diff < 0) {
    diff = (interval + diff) || 1
  }
  if (!exact) {
    diff = Math.trunc(diff / 6) || 1
  }
  return diff * 1000
}

export const lowerUnit = ({ value, unit }) : IValueUnit => {
  if (value === 1) {
    const i = UNITS.indexOf(unit)
    value = LOWER[i] || value
    unit = (i !== -1 && UNITS[i + 1]) || 'second'
  }
  return { value, unit }
}
