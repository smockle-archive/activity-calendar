import toDateArray from '../lib/to-date-array'
import test from 'tape'

test('toDateArray', t => {
  t.plan(1)
  const utcdate = '2018-01-02T16:38:40Z'
  const expected = [2018, 1, 2, 8, 38]
  const actual = toDateArray(utcdate)
  t.deepEqual(actual, expected, 'default')
})
