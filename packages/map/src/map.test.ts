import map from './map'

test('maps to new values', () => {
  const m = new Map<number, number>(
    (function* () {
      for (let i = 0; i < 10; i++) yield [i, i] as const
    })()
  )

  expect(map(m, (_, v) => v * 2)).toMatchInlineSnapshot(`
    Map {
      0 => 0,
      1 => 2,
      2 => 4,
      3 => 6,
      4 => 8,
      5 => 10,
      6 => 12,
      7 => 14,
      8 => 16,
      9 => 18,
    }
  `)
})
