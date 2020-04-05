import { assert } from 'chai'
// @ts-ignore
import sinon from 'sinon'
import { relativeTime } from '../src/relativeTime'

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
