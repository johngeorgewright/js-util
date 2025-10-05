import { beforeEach, expect, test, vi } from 'vitest'
import debounceP from './debounceP.js'
import timeout from './timeout.js'

let fn: () => Promise<{}>
let debouncedFn: typeof fn

beforeEach(() => {
  fn = vi.fn(async () => ({}))
  debouncedFn = debounceP(fn, 10)
})

test('returns the same value within the time limit', async () => {
  let result = await debouncedFn()
  expect(result).toBe(await debouncedFn())
  await timeout(11)
  expect(result).not.toBe(await debouncedFn())
})

test('only calls the function once within the time limit', async () => {
  await debouncedFn()
  await debouncedFn()
  await debouncedFn()
  await debouncedFn()
  expect(fn).toHaveBeenCalledTimes(1)
  await timeout(11)
  await debouncedFn()
  expect(fn).toHaveBeenCalledTimes(2)
})
