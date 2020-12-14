import filterMap from './filter-map'

test('filtering and mapping arrays', () => {
  const result = filterMap(
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    (a) => a > 5,
    (a) => `${a} bottles`
  )

  expect(result).toEqual(['6 bottles', '7 bottles', '8 bottles', '9 bottles'])
  expect(result.length).toBe(4)
})

test('filtering and mapping arraylikes', () => {
  function doIt(..._args: number[]) {
    return filterMap(
      arguments,
      (a) => a > 5,
      (a) => `${a} bottles`
    )
  }

  const result = doIt(1, 2, 3, 4, 5, 6, 7, 8, 9)
  expect(result).toEqual(['6 bottles', '7 bottles', '8 bottles', '9 bottles'])
  expect(result.length).toBe(4)
})
