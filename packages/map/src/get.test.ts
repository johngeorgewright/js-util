import get from './get'

test('returns the value', () => {
  const map = new Map<number, number>(
    (function* () {
      for (let i = 0; i < 10; i++) yield [i, i] as const
    })()
  )

  expect(get(map, 1)).toBe(1)
  expect(get(map, 2)).toBe(2)
})

test('return the default when a key doesnt exist', () => {
  const map = new Map<number, number>(
    (function* () {
      for (let i = 0; i < 10; i++) yield [i, i] as const
    })()
  )

  expect(get(map, 100)).toBe(undefined)
  expect(get(map, 100, 88)).toBe(88)
})
