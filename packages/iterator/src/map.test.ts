import map from './map'

test('mapping generators', () => {
  function* getValues() {
    yield 1
    yield 2
    yield 3
    yield 4
  }

  expect([...map((i: number) => i * 2)(getValues())]).toMatchInlineSnapshot(`
    Array [
      2,
      4,
      6,
      8,
    ]
  `)
})
