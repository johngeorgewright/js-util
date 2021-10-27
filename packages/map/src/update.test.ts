import update from './update'

test('when with no original value', () => {
  expect(
    update(new Map<string, string>(), 'mung', (v) => {
      expect(v).toBeUndefined()
      return 'face'
    })
  ).toMatchInlineSnapshot(`
    Map {
      "mung" => "face",
    }
  `)
})

test('when original value exists', () => {
  const map = new Map<string, string[]>()
  map.set('foo', ['bar'])
  expect(update(map, 'foo', (v) => (v ? [...v, 'rab'] : v!)))
    .toMatchInlineSnapshot(`
    Map {
      "foo" => Array [
        "bar",
        "rab",
      ],
    }
  `)
})

test('immutability', () => {
  const map = new Map<string, string[]>()
  map.set('foo', ['bar'])
  update(map, 'foo', (v) => (v ? [...v, 'rab'] : v!))
  expect(map).toMatchInlineSnapshot(`
    Map {
      "foo" => Array [
        "bar",
      ],
    }
  `)
})
