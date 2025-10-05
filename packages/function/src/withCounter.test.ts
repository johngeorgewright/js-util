import { expect, test, vi } from 'vitest'
import withCounter from './withCounter.js'

test('increments a counter to a given', () => {
  const fn = vi.fn<(count: number, key: string) => string>()
  const counterFn = withCounter(fn)
  counterFn('a')
  counterFn('b')
  counterFn('c')
  expect(fn).toHaveBeenCalledTimes(3)
  expect(fn.mock.calls).toMatchInlineSnapshot(`
    [
      [
        0,
        "a",
      ],
      [
        1,
        "b",
      ],
      [
        2,
        "c",
      ],
    ]
  `)
})

test('change the start number', () => {
  const fn = vi.fn<(count: number) => string>()
  withCounter(fn, 5)()
  expect(fn).toHaveBeenCalledWith(5)
})
