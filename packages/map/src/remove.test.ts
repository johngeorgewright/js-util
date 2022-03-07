import remove from './remove'

test('removes items by key', () => {
  const map = new Map<number, number>(
    (function* () {
      for (let i = 0; i < 10; i++) yield [i, i] as const
    })()
  )

  expect(remove(map, 7)).toMatchInlineSnapshot(`
    Map {
      0 => 0,
      1 => 1,
      2 => 2,
      3 => 3,
      4 => 4,
      5 => 5,
      6 => 6,
      8 => 8,
      9 => 9,
    }
  `)

  expect(remove(map, 10)).toMatchInlineSnapshot(`
    Map {
      0 => 0,
      1 => 1,
      2 => 2,
      3 => 3,
      4 => 4,
      5 => 5,
      6 => 6,
      7 => 7,
      8 => 8,
      9 => 9,
    }
  `)
})
