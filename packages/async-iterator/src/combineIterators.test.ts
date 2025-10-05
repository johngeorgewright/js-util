import { expect, test } from 'vitest'
import accumulate from './accumulate.js'
import combineIterators from './combineIterators.js'
import timeout from '@johngw/async/timeout'

test('combine', async () => {
  async function* a() {
    await timeout(5)
    yield 0
    await timeout(5)
    yield 2
  }

  async function* b() {
    await timeout(8)
    yield 10
  }

  const results = await accumulate(combineIterators(a(), b()))

  expect(results).toMatchInlineSnapshot(`
    [
      0,
      10,
      2,
    ]
  `)
})
