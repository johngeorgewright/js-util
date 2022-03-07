import filter from './filter'

test('filters items', () => {
  const map = new Map<number, number>(
    (function* () {
      for (let i = 0; i < 10; i++) yield [i, i] as const
    })()
  )

  expect(filter(map, (i) => i < 5)).toMatchInlineSnapshot(`
    Map {
      0 => 0,
      1 => 1,
      2 => 2,
      3 => 3,
      4 => 4,
    }
  `)
})
