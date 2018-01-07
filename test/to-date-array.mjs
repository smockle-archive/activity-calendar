import toDateArray from '../lib/to-date-array'
import test from 'tape'

test('toDateArray without adjustment', t => {
  t.plan(1)
  const utcdate = '2018-01-02T16:38:40Z'
  const expected = [2018, 1, 2, 8, 40]
  const actual = toDateArray(utcdate)
  t.deepEqual(actual, expected, 'default')
})

test('toDateArray with adjustment', t => {
  t.plan(1)
  const utcdate = '2015-06-12T03:58:28Z'
  const expected = [2015, 6, 11, 21, 0]
  const actual = toDateArray(utcdate)
  t.deepEqual(actual, expected, 'default')
})
