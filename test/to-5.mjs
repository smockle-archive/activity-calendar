import to5 from '../lib/to-5'
import test from 'tape'

test('to5', t => {
  t.plan(4)
  t.equal(to5(0), 0, 'zero')
  t.equal(to5(31), 30, 'round down')
  t.equal(to5(34), 35, 'round up')
  t.equal(to5(60), 60, 'sixty')
})
