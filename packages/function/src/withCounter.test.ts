import { withCounter } from '.'

test('increments a counter to a given', () => {
  const fn = jest.fn<string, [count: number, key: string]>()
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
  const fn = jest.fn<string, [count: number]>()
  withCounter(fn, 5)()
  expect(fn).toHaveBeenCalledWith(5)
})
