import { expect, test, vi } from 'vitest'
import until from './until.js'

test('until', async () => {
  let count = 0

  const fn = vi.fn(async () => {
    if (count === 3) {
      return true
    } else {
      count++
      return false
    }
  })

  await until(fn, { interval: 10 })
  expect(count).toBe(3)
  expect(fn).toHaveBeenCalledTimes(4)
})
