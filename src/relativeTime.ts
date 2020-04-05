
const isDate = (value: any): boolean =>
  value && (value instanceof Date) && !isNaN(value.getTime())

const UNITS = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second']

const inUnit = (end: Date, start: Date, divider: number = 1) =>
  Math.trunc((end.getTime() - start.getTime()) / 1000 / divider )

const inMonths = (end: Date, start: Date, days: number): number => {
  if (Math.abs(days) < 31) return 0
  return Math.trunc(end.getMonth() + 12 * end.getFullYear() - (start.getMonth() + 12 * start.getFullYear()))
}

export const relativeTime = (value?: Date, unit?: string) => {
  if (isDate(value)) {
    const now = new Date()
    const day = inUnit(value, now, 24 * 3600)
    const month = inMonths(value, now, day)

    const diff = {
      year: Math.trunc(month / 12),
      month,
      week: inUnit(value, now, 7 * 24 * 3600),
      day,
      hour: inUnit(value, now, 3600),
      minute: inUnit(value, now, 60),
      second: inUnit(value, now)
    }

    for (let i = 0; i < UNITS.length; i++) {
      const unit = UNITS[i]
      const value = diff[unit]
      if (value !== 0) {
        return { value, unit }
      }
    }
    return { value: 0, unit: 'second' }
  }
  return { value, unit }
}
