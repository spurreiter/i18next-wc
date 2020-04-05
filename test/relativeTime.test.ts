import { assert } from 'chai'
// @ts-ignore
import sinon from 'sinon'
import { relativeTime, nextIntervalMs, lowerUnit } from '../src/relativeTime'

describe('relativeTime', function () {
  it('shall consider days less than 30', function () {
    const clock = sinon.useFakeTimers(new Date('2019-12-31T23:59:50Z'))
    const date = new Date('2020-01-01T00:00:00Z')
    const { value, unit } = relativeTime(date)
    clock.restore()
    assert.strictEqual(value, 10)
    assert.strictEqual(unit, 'second')
  })

  it('shall consider years in future', function () {
    const clock = sinon.useFakeTimers(new Date('2015-12-31T23:59:50Z'))
    const date = new Date('2020-01-01T00:00:00Z')
    const { value, unit } = relativeTime(date)
    clock.restore()
    assert.strictEqual(value, 4)
    assert.strictEqual(unit, 'year')
  })

  it('shall consider months in past', function () {
    const clock = sinon.useFakeTimers(new Date('2020-11-31T23:59:50Z'))
    const date = new Date('2020-01-01T00:00:00Z')
    const { value, unit } = relativeTime(date)
    clock.restore()
    assert.strictEqual(value, -11)
    assert.strictEqual(unit, 'month')
  })

  it('shall consider weeks in future', function () {
    const clock = sinon.useFakeTimers(new Date('2020-01-01T00:00:00Z'))
    const date = new Date('2020-01-15T00:00:00Z')
    const { value, unit } = relativeTime(date)
    clock.restore()
    assert.strictEqual(value, 2)
    assert.strictEqual(unit, 'week')
  })
})

describe('nextIntervalMs', function() {
  it('shall return 1 second on no args', function () {
    const ms = nextIntervalMs({ unit: '' })
    assert.strictEqual(ms, 1000)
  })

  it('shall return interval for unit if date is unknown', function () {
    const ms = nextIntervalMs({ unit: 'minute' }, true)
    assert.strictEqual(ms, 60000)
  })

  it('now - 50s', function () {
    const date = new Date(Date.now() - 50000)
    const ms = nextIntervalMs({ date, unit: 'minute' }, true)
    assert.strictEqual(ms, 10000)
  })

  it('now + 50s', function () {
    const date = new Date(Date.now() + 50000)
    const ms = nextIntervalMs({ date, unit: 'minute' }, true)
    assert.strictEqual(ms, 50000)
  })

  it('now - 500s', function () {
    const date = new Date(Date.now() - 500000)
    const ms = nextIntervalMs({ date, unit: 'minute' }, true)
    assert.strictEqual(ms, 40000)
  })
})

describe('lowerUnit', function () {
  it('shall return 1 second', function () {
    const res = lowerUnit({ value: 1, unit: '' })
    assert.deepEqual(res, { value: 1, unit: 'second' })
  })

  it('shall return same', function () {
    const res = lowerUnit({ value: 14, unit: 'minute' })
    assert.deepEqual(res, { value: 14, unit: 'minute' })
  })

  it('shall deal with unknow unit', function () {
    const res = lowerUnit({ value: 1, unit: 'unknown' })
    assert.deepEqual(res, { value: 1, unit: 'second' })
  })

  it('shall return 60 second', function () {
    const res = lowerUnit({ value: 1, unit: 'minute' })
    assert.deepEqual(res, { value: 60, unit: 'second' })
  })

  it('shall return 60 minute', function () {
    const res = lowerUnit({ value: 1, unit: 'hour' })
    assert.deepEqual(res, { value: 60, unit: 'minute' })
  })

  it('shall return 24 hour', function () {
    const res = lowerUnit({ value: 1, unit: 'day' })
    assert.deepEqual(res, { value: 24, unit: 'hour' })
  })

  it('shall return 4 week', function () {
    const res = lowerUnit({ value: 1, unit: 'month' })
    assert.deepEqual(res, { value: 4, unit: 'week' })
  })

  it('shall return 4 week', function () {
    const res = lowerUnit({ value: 1, unit: 'year' })
    assert.deepEqual(res, { value: 12, unit: 'month' })
  })
})
