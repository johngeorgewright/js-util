import { expect, test } from 'vitest'
import mapP from './mapP.js'

test('it returns a promise of all mapped items', async () => {
  expect(await mapP([1, 2, 3, 4, 5], async (i) => i + 1)).toEqual([
    2,
    3,
    4,
    5,
    6,
  ])
})
