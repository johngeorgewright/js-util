import set from './set'

test('sets a new value', () => {
  const map = new Map<string, string>()
  expect(map).toMatchInlineSnapshot(`Map {}`)
  expect(set(map, 'a', 'A')).toMatchInlineSnapshot(`
    Map {
      "a" => "A",
    }
  `)
  expect(set(map, 'b', 'B')).toMatchInlineSnapshot(`
    Map {
      "b" => "B",
    }
  `)
})
