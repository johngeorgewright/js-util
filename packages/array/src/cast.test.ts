import cast from './cast'

test('cast arrays', () => {
  expect(cast([1, 2, 3])).toEqual([1, 2, 3])
})

test('cast undefined', () => {
  expect(cast(undefined)).toEqual([])
})

test('cast anything', () => {
  expect(cast('foo')).toEqual(['foo'])
  expect(cast(true)).toEqual([true])
})

test('cast functions', () => {
  expect(cast(() => [1, 2, 3])).toEqual([1, 2, 3])
  expect(cast(() => 1)).toEqual([1])
})

test('types', () => {
  ;(x: number) => cast(x).map((x) => x + 1)
  ;(x: number[]) => cast(x).map((x) => x + 1)
  ;(x: number | number[]) => cast(x).map((x) => x + 1)
  ;(x?: number) => cast(x).map((x) => x + 1)
})
