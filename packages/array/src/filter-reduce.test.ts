import filterReduce from './filter-reduce'

test('filtering and reducing arrays', () => {
  expect(
    filterReduce(
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      0,
      (_, x) => x < 5,
      (sum, x) => sum + x
    )
  ).toBe(10)
})

test('filtering and reducing arraylikes', () => {
  function doIt(..._args: number[]) {
    return filterReduce(
      arguments,
      0,
      (_, x) => x > 5,
      (sum, x) => sum + x
    )
  }

  expect(doIt(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(30)
})
