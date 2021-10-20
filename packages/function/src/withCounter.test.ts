import { withCounter } from '.'

test('increments a counter to a given', () => {
  const fn = jest.fn<string, [number, string]>()
  const counterFn = withCounter(fn)
  counterFn('a')
  counterFn('b')
  counterFn('c')
  expect(fn).toHaveBeenCalledTimes(3)
  expect(fn.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        0,
        "a",
      ],
      Array [
        1,
        "b",
      ],
      Array [
        2,
        "c",
      ],
    ]
  `)
})

test('change the start number', () => {
  const fn = jest.fn<string, [number]>()
  withCounter(fn, 5)()
  expect(fn).toHaveBeenCalledWith(5)
})
