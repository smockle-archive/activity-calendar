import toMiles from '../lib/to-miles'
import test from 'tape'
const threshold = 0.000001

test('toMiles', t => {
  t.plan(1)
  const meters = 3284.6
  const expected = 2.04095582
  const actual = toMiles(meters)
  t.ok(Math.abs(actual - expected) < threshold, 'default')
})
